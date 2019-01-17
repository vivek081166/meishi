import {Component, OnInit} from '@angular/core';

import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  model: tf.Model;
  predictions: any;

  ngOnInit() {
    this.loadModel();
  }

  // Load pretrained KERAS model
  async loadModel() {
    this.model = await tf.loadModel('./assets/model.json');
  }

  // Do predictions
  async predict(imageData: ImageData) {

    const pred = await tf.tidy(() => {

      // Convert the canvas pixels to 
      let img = tf.fromPixels(imageData, 1);
      // @ts-ignore
      img = img.reshape([1, 28, 28, 1]);
      img = tf.cast(img, 'float32');

      // Make and format the predications
      const output = this.model.predict(img) as any;

      // Save predictions on the component
      this.predictions = Array.from(output.dataSync());
    });

  }

}


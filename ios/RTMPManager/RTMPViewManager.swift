//
//  RTMPViewManager.swift
//  rtmpPackageExample
//
//  Created by Yudi Edri Alviska Bayantemur on 15.01.2022.
//

import UIKit

@objc(RTMPPublisherManager)
class RTMPViewManager: RCTViewManager {
  override func view() -> UIView! {
    return RTMPView()
  }
}

//
//  RTMPViewManager.swift
//  rtmpPackageExample
//
//  Created by Yudi Edri Alviska on 15.01.2022.
//

import AVFoundation
import HaishinKit
import Logboard
import UIKit

//let logger = LBLogger.with("com.haishinkit.Exsample.iOS")

@objc(RTMPPublisherManager)
class RTMPViewManager: RCTViewManager {
    override init() {
        let session = AVAudioSession.sharedInstance()
        do {
            // https://stackoverflow.com/questions/51010390/avaudiosession-setcategory-swift-4-2-ios-12-play-sound-on-silent
            if #available(iOS 10.0, *) {
                try session.setCategory(.playAndRecord, mode: .voiceChat, options: [.defaultToSpeaker, .allowBluetooth])
            } else {
                session.perform(NSSelectorFromString("setCategory:withOptions:error:"), with: AVAudioSession.Category.playAndRecord, with: [
                    AVAudioSession.CategoryOptions.allowBluetooth,
                    AVAudioSession.CategoryOptions.defaultToSpeaker
                ])
                try session.setMode(.voiceChat)
            }
            try session.setActive(true)
        } catch {
//            logger.error(error)
        }
    }
    override func view() -> UIView! {
        return RTMPView()
    }
}

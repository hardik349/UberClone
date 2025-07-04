package com.uberclone

import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class BiometricModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "Biometric"
    }

    @ReactMethod
    fun authenticate(promise: Promise) {
        val activity = currentActivity as? FragmentActivity ?: run {
            promise.reject("ACTIVITY_NOT_FOUND", "Current activity not found")
            return
        }

        activity.runOnUiThread {
            val executor = ContextCompat.getMainExecutor(activity)
            val biometricPrompt = BiometricPrompt(
                activity,
                executor,
                object : BiometricPrompt.AuthenticationCallback() {
                    override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                        promise.resolve(true)
                    }

                    override fun onAuthenticationFailed() {
                        promise.reject("AUTH_FAILED", "Authentication failed")
                    }

                    override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
                        promise.reject(errorCode.toString(), errString.toString())
                    }
                }
            )

            val promptInfo = BiometricPrompt.PromptInfo.Builder()
                .setTitle("Biometric Authentication")
                .setSubtitle("Use Biometric to Continue")
                .setNegativeButtonText("Cancel")
                .build()

            biometricPrompt.authenticate(promptInfo)
        }
    }
}
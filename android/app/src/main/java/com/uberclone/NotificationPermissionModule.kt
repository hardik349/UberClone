package com.uberclone

import android.Manifest
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.core.app.ActivityCompat
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class NotificationPermissionModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), ActivityEventListener {

    private var permissionPromise: Promise? = null

    init {
        reactContext.addActivityEventListener(this);
    }

    override fun getName(): String {
        return "NotificationPermission"
    }


    @ReactMethod
    fun requestPermission(promise: Promise) {
        Log.d("NotificationModule", "Requesting permission...") // Add this line at the top of requestPermission()

        val activity = currentActivity
        if (activity == null) {
            promise.reject("NO_ACTIVITY", "Current activity not found")
            return
        }

        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) {
            // No permission needed before Android 13
            promise.resolve(true)
            return
        }

        val permission = Manifest.permission.POST_NOTIFICATIONS
        if(ActivityCompat.checkSelfPermission(reactContext, permission) == PackageManager.PERMISSION_GRANTED){
            promise.resolve(true)
        } else {
            permissionPromise = promise
            ActivityCompat.requestPermissions(activity, arrayOf(permission), 2001)
        }
    }

    override fun onActivityResult(
        activity: Activity,
        requestCode: Int,
        resultCode: Int,
        data: Intent?
    ) {
        TODO("Not yet implemented")
    }

    override fun onNewIntent(intent: Intent) {
        TODO("Not yet implemented")
    }


}
package com.example.songpafoodmarket;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.Timestamp;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class MyFirebaseMessagingService extends FirebaseMessagingService {
    private static final String TAG = "MsgService";

    public void onMessageReceived(RemoteMessage remoteMessage) {
        Log.d(TAG, "From: " + remoteMessage.getFrom());
        String board = null;
        String contentId = "";

//        board = "Notices";
//        contentId = "8eE5n27qTP5u2gTSMRyl";
        Log.d(TAG, "onMessageReceived: --------------------1111");
        if (remoteMessage.getData().size() > 0) {
            ArrayList<String> parsingData = jsonParsing(remoteMessage.getData().get("message"));
            board = parsingData.get(0);
            contentId = parsingData.get(1);// 오늘은 여기까지
            // data랑 board, id 잘 불러오나 확ㅇ니

            Log.d(TAG, "Message Notification board: " + board);
            Log.d(TAG, "Message Notification id: " + contentId);
        }

        if (remoteMessage.getNotification() != null) {
            Log.d(TAG, "Message Notification Title: " + remoteMessage.getNotification().getTitle());
            Log.d(TAG, "Message Notification Body: " + remoteMessage.getNotification().getBody());

            String title = remoteMessage.getNotification().getTitle();
            String body = remoteMessage.getNotification().getBody();

            if (board != null) {
                generateNotificationWithFirestore(title, body, board, contentId);
            } else {
                generateNotification(new Intent(this, MainActivity.class), title, body);
            }
        }
    }

    private void generateNotification(Intent intent, String messageTitle, String messageBody) {
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);

//        // Create the TaskStackBuilder and add the intent, which inflates the back stack
//        TaskStackBuilder stackBuilder = TaskStackBuilder.create(this);
//        stackBuilder.addNextIntentWithParentStack(intent);
//        // Get the PendingIntent containing the entire back stack
        PendingIntent resultPendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_ONE_SHOT );
//                stackBuilder.getPendingIntent(0,  PendingIntent.FLAG_ONE_SHOT | PendingIntent.FLAG_UPDATE_CURRENT);


        String channelId = getString(R.string.default_notification_channel_id);
        Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        NotificationCompat.Builder notificationBuilder =
                new NotificationCompat.Builder(this, channelId)
                        .setSmallIcon(R.mipmap.ic_launcher)
                        .setContentTitle(messageTitle)
                        .setContentText(messageBody)
                        .setAutoCancel(true)
                        .setSound(defaultSoundUri)
                        .setContentIntent(resultPendingIntent);
        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            String channelName = getString(R.string.default_notification_channel_id);
            NotificationChannel channel = new NotificationChannel(channelId, channelName, NotificationManager.IMPORTANCE_HIGH);
            notificationManager.createNotificationChannel(channel);
        }
        notificationManager.notify(0, notificationBuilder.build());

    }

    private void generateNotificationWithFirestore(final String messageTitle, final String messageBody, final String board, String id) {
        com.google.firebase.firestore.FirebaseFirestore db = FirebaseFirestore.getInstance();
        db.collection(board).document(id)
                .get().addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
            @Override
            public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                if (task.isSuccessful()) {
                    DocumentSnapshot document = task.getResult();
                    if (document.exists()) {
                        ListViewItem wrapData = new ListViewItem();
                        wrapData.setId(document.getId());
                        wrapData.setTitle(document.getData().get("title").toString());
                        wrapData.setDate((Timestamp) document.getData().get("creation_time"));
                        wrapData.setContent(document.getData().get("content").toString());

                        Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                        intent.putExtra("item", wrapData);
                        intent.putExtra("board", board);
                        generateNotification(intent, messageTitle, messageBody);
                    } else {
                        Log.d(TAG, "No such document");
                    }
                } else {
                    Log.d(TAG, "get failed with ", task.getException());
                }
            }
        });
    }

    private ArrayList<String> jsonParsing(String json)
    {
        try{
            JSONObject jsonObject = new JSONObject(json);
            ArrayList<String> result = new ArrayList<String>();

            result.add(jsonObject.getString("board"));
            result.add(jsonObject.getString("id"));

            return result;
        }catch (JSONException e) {
            e.printStackTrace();
        }

        return null;
    }
}






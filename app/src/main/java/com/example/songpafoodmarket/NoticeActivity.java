package com.example.songpafoodmarket;

import android.os.Bundle;
import android.webkit.WebView;

import androidx.appcompat.app.AppCompatActivity;

public class NoticeActivity extends AppCompatActivity {
    //    TextView creation_time, title;
    WebView content, creation_time, title;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notice);

        title = findViewById(R.id.textView6);
        creation_time = findViewById(R.id.textView7);
        content = findViewById(R.id.textView8);

        ListViewItem item = (ListViewItem) getIntent().getExtras().getSerializable("item");

        title.loadData(item.getTitle(), "text/html", null);
        creation_time.loadData(item.getDate(), "text/html", null);
        content.loadData(item.getContent(), "text/html", null);
    }
}

//        db = FirebaseFirestore.getInstance();
//
//        final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss");
//        final DocumentReference documentReference = db.collection("Notices").document("Notice1");
//        documentReference.addSnapshotListener(this, new EventListener<DocumentSnapshot>() {
//            @Override
//            public void onEvent(@Nullable DocumentSnapshot documentSnapshot, @Nullable FirebaseFirestoreException e) {
//                title.setText(documentSnapshot.getString("title"));
//                content.setText(documentSnapshot.getString("content"));
//                creation_time.setText(dateFormat.format(documentSnapshot.getTimestamp("creation_time")));
//            }
//        });

//public class NoticeActivity extends AppCompatActivity {
//    TextView content, creation_time, title;
//    FirebaseFirestore firebaseFirestore;
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_notice);
//        title = findViewById(R.id.textView6);
//        content = findViewById(R.id.textView7);
//
//        firebaseFirestore = FirebaseFirestore.getInstance();
//
//        DocumentReference documentReference = firebaseFirestore.collection("Notices").document("Notice1");
//        documentReference.addSnapshotListener(this, new EventListener<DocumentSnapshot>() {
//                @Override
//                public void onEvent(@Nullable DocumentSnapshot documentSnapshot, FirebaseFirestoreException e) {
//                    title.setText(documentSnapshot.getString("title"));
//                }
//        });
//        WebView webView = (WebView) findViewById(R.id.webView);
//        webView.loadData("<html>" +
//                        " <body> " +
//                        "<p> " +
//                        "<strong>김도현님</strong>께서 기부해 주신 후원금으로 구입한 휴지입니다. " +
//                        "<img src=\"http://www.songpafood.or.kr/data/editor/2003/75bf49b1fb88bc7ab938e03fe2e9ed23_1584925632_479.jpg\" alt=\"image\"> " +
//                        "소중한 마음 잘 전달될 수 있도록 하겠습니다. 감사합니다!!</p>    </body>    </html>",
//                "text/html", null);
//        TextView textview = (TextView) findViewById(R.id.textView3);
//        TextView textview2 = (TextView) findViewById(R.id.textView4);
//        Intent intent = getIntent();
//        textview.setText(intent.getStringExtra("Notice1"));
//        textview2.setText(intent.getStringExtra("Date"));
//    }
//}


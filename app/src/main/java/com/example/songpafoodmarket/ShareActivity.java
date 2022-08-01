package com.example.songpafoodmarket;

import android.os.Bundle;
import android.webkit.WebView;

import androidx.appcompat.app.AppCompatActivity;

public class ShareActivity extends AppCompatActivity {
    WebView title, content, creation_time;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_share);

        title = findViewById(R.id.textView12);
        creation_time = findViewById(R.id.textView13);
        content = findViewById(R.id.textView14);

        ListViewItem wrapData = (ListViewItem) getIntent().getExtras().getSerializable("item");
        title.loadData(wrapData.getTitle(), "text/html", null);
        creation_time.loadData(wrapData.getDate(), "text/html", null);
        content.loadData(wrapData.getContent(), "text/html", null);
    }
}

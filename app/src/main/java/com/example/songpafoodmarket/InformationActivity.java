package com.example.songpafoodmarket;

import android.os.Bundle;
import android.webkit.WebView;

import androidx.appcompat.app.AppCompatActivity;

public class InformationActivity extends AppCompatActivity {
//    TextView title, creation_time;
    WebView content;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_information);

        content = findViewById(R.id.textView11);
        content.loadUrl("http://www.songpafood.or.kr/bbs/board.php?bo_table=0201");
    }
}

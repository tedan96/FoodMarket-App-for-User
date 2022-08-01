package com.example.songpafoodmarket;

import com.google.firebase.Timestamp;

import java.io.Serializable;
import java.text.SimpleDateFormat;

public class ListViewItem implements Serializable {

    private static final long serialVersionUID = 1L;

    private String titleStr;
    private String dateStr;
    private String contentStr;
    private String id = "";


    public void setTitle(String title) {
        titleStr = title;
    }
    public void setDate(String date){dateStr = date;}
    public void setDate(Timestamp timestamp){
        final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        dateStr = dateFormat.format(timestamp.toDate());
    }
    public void setContent(String content) {contentStr = content; }

    public String getTitle() {
        return this.titleStr;
    }
    public String getDate() {return this.dateStr;}
    public String getContent() {return this.contentStr;}
    public String getId() {return id;}
    public void setId(String id) {this.id = id;}
}

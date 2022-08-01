package com.example.songpafoodmarket;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.google.firebase.Timestamp;

import java.util.ArrayList;
import java.util.Map;

public class ListViewAdapter extends BaseAdapter {

    private ArrayList<ListViewItem> listViewItemList = new ArrayList<ListViewItem>() ;

    public ListViewAdapter() {

    }

    @Override
    public int getCount() {
        return listViewItemList.size() ;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        final int pos = position;
        final Context context = parent.getContext();

        if (convertView == null) {
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(R.layout.list_item, parent, false);
        }
        TextView titleTextView = (TextView) convertView.findViewById(R.id.textView1) ;
        TextView dateTextView = (TextView) convertView.findViewById(R.id.textView2) ;

        ListViewItem listViewItem = listViewItemList.get(position);

        titleTextView.setText(listViewItem.getTitle());
        dateTextView.setText(listViewItem.getDate());
        return convertView;
    }

    @Override
    public long getItemId(int position) {
        return position ;
    }

    @Override
    public Object getItem(int position) {
        return listViewItemList.get(position) ;
    }

    public void addItem(String title,String date) {
        ListViewItem item = new ListViewItem();
        item.setTitle(title);
        item.setDate(date);
        listViewItemList.add(item);
    }

    public void addItem(String title,String date, String id) {
        ListViewItem item = new ListViewItem();
        item.setTitle(title);
        item.setDate(date);
        item.setId(id);
        listViewItemList.add(item);
    }

    public void addItem(String id, Map<String, Object> data) {
        ListViewItem item = new ListViewItem();
        item.setId(id);
        item.setTitle(data.get("title").toString());
        item.setDate((Timestamp)data.get("creation_time"));
        item.setContent(data.get("content").toString());
        Log.d ("tag", "Load from addItem : " + item.getTitle());
        listViewItemList.add(item);
    }
}


package com.example.songpafoodmarket.ui.notice;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProviders;

import com.example.songpafoodmarket.ListViewAdapter;
import com.example.songpafoodmarket.ListViewItem;
import com.example.songpafoodmarket.NoticeActivity;
import com.example.songpafoodmarket.R;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.Query.Direction;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.ArrayList;

public class NoticeFragment extends Fragment {
    private ListView listview;
    private ListViewAdapter adapter;
    private NoticeViewModel mViewModel;
    private String TAG = "tag";
    private TextView textView;
    private ListViewAdapter listViewAdapter;
    private ArrayList<ListViewItem> List;
    public static NoticeFragment newInstance() {
        return new NoticeFragment();
    }

        @Override
        public View onCreateView(@NonNull LayoutInflater inflater, @Nullable final ViewGroup container,
                                 @Nullable Bundle savedInstanceState) {
            View root = inflater.inflate(R.layout.fragment_notice, container, false);

            // Adapter 생성
            adapter = new ListViewAdapter();
            // 리스트뷰 객체 생성 및 Adapter 설정
            ListView listview = (ListView) root.findViewById(R.id.listview);
            listview.setAdapter(adapter);
            // 리스트 뷰 아이템 추가.

//            adapter.addItem("제목1인데 길이 테스트할려고 길게 써요", "2020/8/27", "fewjf32fj2kfds");
//            adapter.addItem("제목2", "2020/8/28");
//            adapter.addItem("제목3", "2020/8/29");
//            adapter.addItem("제목4", "2020/8/30");
//            adapter.addItem("제목4", "2020/8/30");

            loadNotice();
            listview.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long l_position) {
                    String title = ((ListViewItem) parent.getAdapter().getItem(position)).getTitle();
                    String date = ((ListViewItem) parent.getAdapter().getItem(position)).getDate();
                    ListViewItem item =(ListViewItem) parent.getAdapter().getItem(position);
                    Intent intent = new Intent(getActivity(), NoticeActivity.class);
//                    intent.putExtra("title", title);
//                    intent.putExtra("Date", date);
                    intent.putExtra("item", item);
                    startActivity(intent);
                }
            });
            return root;
        }

        @Override
        public void onActivityCreated(@Nullable Bundle savedInstanceState) {
            super.onActivityCreated(savedInstanceState);
            mViewModel = ViewModelProviders.of(this).get(NoticeViewModel.class);
            // TODO: Use the ViewModel
        }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate (savedInstanceState);
    }

    public void loadNotice(){
        FirebaseFirestore db = FirebaseFirestore.getInstance ();
        db.collection("Notices").orderBy("creation_time", Direction.DESCENDING)
                .get()
                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>(){
                    @Override
                    public void onComplete(@NonNull Task<QuerySnapshot> task){
                        if(task.isSuccessful()){
                            for(QueryDocumentSnapshot document : task.getResult ()) {
                                Log.d (TAG, document.getId () + "=>" + document.getData ());
                                adapter.addItem(document.getId(), document.getData());
                            }
                            adapter.notifyDataSetChanged();
                        }else{
                            Log.w(TAG,"Error getting documents", task.getException ());
                        }
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Log.w(TAG, "Fail");
                    }
                });
    }
}





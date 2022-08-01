package com.example.songpafoodmarket.ui.share;

import static android.content.ContentValues.TAG;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProviders;

import com.example.songpafoodmarket.ListViewAdapter;
import com.example.songpafoodmarket.ListViewItem;
import com.example.songpafoodmarket.R;
import com.example.songpafoodmarket.ShareActivity;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.Query.Direction;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

public class ShareFragment extends Fragment {
    private ListViewAdapter adapter;
    private ShareViewModel mViewModel;

    public static ShareFragment newInstance() {
        return new ShareFragment();
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable final ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View root = inflater.inflate(R.layout.fragment_share, container, false);

        // Adapter 생성
        adapter = new ListViewAdapter();

        // 리스트뷰 객체 생성 및 Adapter 설정
        ListView listview = (ListView) root.findViewById(R.id.listview);
        listview.setAdapter(adapter);

        loadShare();
        // 리스트 뷰 아이템 추가.
//        adapter.addItem("제목","2020/8/27");
//        adapter.addItem("제목","2020/8/27");
//        adapter.addItem("제목","2020/8/27");
//        adapter.addItem("제목","2020/8/27");


        listview.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long l_position) {
                String title = ((ListViewItem) parent.getAdapter().getItem(position)).getTitle();
                String date = ((ListViewItem) parent.getAdapter().getItem(position)).getDate();
                ListViewItem item =(ListViewItem) parent.getAdapter().getItem(position);
                Intent intent = new Intent(getActivity(), ShareActivity.class);
                intent.putExtra("item", item);
                startActivity(intent);
            }
        });
        return root;
    }
    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        mViewModel = ViewModelProviders.of(this).get(ShareViewModel.class);
        // TODO: Use the ViewModel
    }
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate (savedInstanceState);
    }

    public void loadShare(){
        FirebaseFirestore db = FirebaseFirestore.getInstance ();
        db.collection("Contributions").orderBy("creation_time", Direction.DESCENDING)
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
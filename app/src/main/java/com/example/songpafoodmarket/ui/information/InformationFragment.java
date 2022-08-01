package com.example.songpafoodmarket.ui.information;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProviders;

import com.example.songpafoodmarket.ListViewAdapter;
import com.example.songpafoodmarket.R;

public class InformationFragment extends Fragment {

    private InformationViewModel mViewModel;
    private ListViewAdapter adapter;

    public static InformationFragment newInstance() {
        return new InformationFragment();
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable final ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View root = inflater.inflate(R.layout.fragment_information, container, false);
//        return inflater.inflate(R.layout.fragment_information, container, false);

        ((WebView)root.findViewById(R.id.contentView)).loadUrl("http://www.songpafood.or.kr/bbs/board.php?bo_table=0201");

        return root;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        mViewModel = ViewModelProviders.of(this).get(InformationViewModel.class);
        // TODO: Use the ViewModel
    }
}
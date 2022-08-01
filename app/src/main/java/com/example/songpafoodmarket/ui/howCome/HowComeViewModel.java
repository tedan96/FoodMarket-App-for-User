package com.example.songpafoodmarket.ui.howCome;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class HowComeViewModel extends ViewModel {

    private MutableLiveData<String> mText;

    public HowComeViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue(" 마천역 1번출구에서 직진 후 삼거리에서 좌회전 도보 5분정도 소요");
    }

    public LiveData<String> getText() {
        return mText;
    }
}
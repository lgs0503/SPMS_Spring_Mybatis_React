import React, {useEffect} from 'react';
import '../../css/custom.css';
import loading from '../../image/loading.gif';

const Loading = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open } = props;

    useEffect(() => {
    }, []);

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div id="loading" className={open ? 'openLoading loading' : 'loading'}>
            <img src={loading}/>
        </div>
    );
};

export default Loading;
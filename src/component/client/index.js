import React from 'react';

const  Main = () => {
    return (
        <div className="wrap">
            <header>
                <div id="myNav" className="overlay">
                    <a href="#" className="closebtn">&amp;times;</a>
                    <div className="overlay-content">
                        <a href="#">About</a>
                        <a href="#">Services</a>
                        <a href="#">Clients</a>
                        <a href="#">Contact</a>
                    </div>
                </div>
                <div className="logo"></div>
                <ul className="member_list">
                    <li><a href="#" className="text_trans">Home</a></li>
                    <li><a href="#" className="text_trans">Login</a></li>
                    <li><a href="#" className="text_trans">Cart</a></li>
                    <li><a href="#" className="text_trans">My page</a></li>
                </ul>
            </header>
            <section>
                <div className="section1_background_video">
                    <video className="elementor-background-video-hosted elementor-html5-video" autoPlay="autoplay" muted="muted" loop="loop"
                           src="https://content.rolex.cn/dam/rolex-sav/buying-a-rolex/buying-an-authentic-rolex/2021/videos/cover/buying-an-authentic-rolex-cover.mp4"
                           ></video>
                </div>
            </section>
            <div className="container">
                <section>
                    <div className="section2_view">
                        <div className="section2_text">
                            <div className="logo"></div>
                        </div>
                        <div className="section2_img">
                            <img src="img/img_main01.png" ></img>
                        </div>
                    </div>
                </section>
            </div>
        </div>
  );
}
export default Main;

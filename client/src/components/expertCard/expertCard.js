import React, { useState } from 'react';
import './expertCart.scss';
import img from '../../icon/Capture.PNG';
import { Rate } from 'antd';
import Rating from '@material-ui/lab/Rating';


const ExpertCard = () => {
    const [value, setValue] = useState(4.5);
    return (
        <div className="expert">
            <div className="expert-infos">
                <h3 className="gray-color ml mt">2</h3>
                <div className="expert-image">
                    <img alt="expert" src={img} className="img"></img>
                </div>
                <div className="expert-details">
                    <h1 className="expert-name">Saida</h1>
                    <div className="expert-work-location">
                        <a href="#" className="expert-work">Expert mecanique</a>
                        <p>Localisation</p>
                        <h4>Fouchena Cité Amal</h4>
                    </div>
                    <div className="rating">
                        <Rating
                            precision={0.5}
                            name="half-rating"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            readOnly
                        />
                        <p>4.5 out of 5</p>
                    </div>
                </div>

            </div>
            <div className="expert-profileBtn">
                <button className="expert-profile-button">
                    view profile
                </button>
            </div>
        </div>
    );
};

export default ExpertCard;

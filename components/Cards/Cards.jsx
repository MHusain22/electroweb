import React from 'react'
import classes from './Cards.module.css';
import shop from '../../images/shop.png';
import payment from '../../images/payment.png';
import clock from '../../images/clock.png';
import t from '../../images/t.png';
import Image from 'next/image';

const Card = (props) => {
  return (
    <div className={classes.card}>
        <div className={classes.smallcontainer}>
            <div className={classes.row}>
                <div className={classes.col}>
                    <Image src={payment} alt="" />
                    <h3>Ekdum Safe payment</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className={classes.col}>
                    <Image src={shop} alt="" />
                    <h3>Shop With Confidence</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className={classes.col}>
                    <Image className='t' src={t} alt="" />
                    <h3>World Wide Dilevery</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className={classes.col}>
                    <Image src={clock} alt="" />
                    <h3>24/7 Help Center</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card;

{/* <h3>Safe payment</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className="col">
                    <Image src={shop} alt="" />
                    <h3>Shop With Confidence</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className="col">
                    <Image className='t' src={t} alt="" />
                    <h3>World Wide Dilevery</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className="col">
                    <Image src={clock} alt="" />
                    <h3>24/7 Help Center</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                 */}
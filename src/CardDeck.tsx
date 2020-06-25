import React, {useRef} from "react";
import {Swipeable} from "react-swipeable";

interface Card {
    title: string;
    turned: boolean;
}

const cards = [
    {
        "title": "Test",
        "turned": false
    },
    {
        "title": "Test2",
        "turned": false
    },
    {
        "title": "Test3",
        "turned": false
    },
    {
        "title": "Test4",
        "turned": false
    }]

export default class CardDeck extends React.Component<any, any> {
    deckRef: any;
    constructor(props: any) {
        super(props);
        this.deckRef = React.createRef();
    }
    render() {
        return <div className="deck" >
            {cards.map((card: Card, index: number) => {
                return <Swipeable key={card.title+index} onSwipedLeft={this.swipeLeft} onSwipedRight={this.swipeRight}>
                    <div onClick={this.cardAnimations}  className={card.turned ? 'card turned' : 'card'} style={{transform: 'rotate('+(Math.random() * 10 + index)+'deg)'}}>

                        <div className="cardfront">
                            Voorkant
                        </div>

                        <div className="cardback">
                            Achterkant
                        </div>

                    </div>

                </Swipeable>;

            })}
            <div className="dealer" ref={this.deckRef} onClick={this.dealerClose}/>
        </div>
    }

    private swipeLeft = (e: any) => {
        let event = e.event.currentTarget.classList;
        if(document.getElementsByClassName("dealer")[0]){
            document.getElementsByClassName("dealer")[0].classList.remove("showdealer");
        }
        event.add("moveleft");
        setTimeout(() => {
            event.add("fadeout");
            setTimeout(() => {
                event.add("invis");
            }, 400);
        }, 200);
    }

    private swipeRight = (e: any) => {
        let event = e.event.currentTarget.classList;
        if(document.getElementsByClassName("dealer")[0]){
            document.getElementsByClassName("dealer")[0].classList.remove("showdealer");
        }
            event.add("moveright");
            setTimeout(() => {
                event.add("fadeout");
                setTimeout(() => {
                    event.add("invis");
                }, 400);
            }, 200)
    }
    private dealerClose = (e: any) => {
        document.getElementsByClassName("dealer")[0].classList.remove("showdealer");
        document.getElementsByClassName("ontop")[0].classList.remove("rotate");
        let event = document.getElementsByClassName("ontop")[0].classList;
        setTimeout(() => {
            event.remove("turned");
            setTimeout(() => {
                event.remove("ontop");

            }, 350)
        }, 150)


    }


    private cardAnimations = (e: any) => {

        if(e.currentTarget.classList.contains("ontop") && e.currentTarget.classList.contains("turned")){
            e.currentTarget.classList.remove("rotate");
            let event = e.currentTarget.classList;
            setTimeout(() => {
                event.remove("turned");
            }, 150)
            // e.currentTarget.classList.remove("turned");
            console.log("Rotate me!");
        }else if(e.currentTarget.classList.contains("ontop")){
            e.currentTarget.classList.add("rotate");
            let event = e.currentTarget.classList;
            setTimeout(() => {
                event.add("turned");
            }, 150)
        }
        if(!e.currentTarget.classList.contains("ontop")){
            e.currentTarget.classList.add("ontop");
            this.deckRef.current.classList.add("showdealer");
        }

    }
}
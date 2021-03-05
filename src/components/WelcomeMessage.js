import React, { useState, useEffect } from "react"
import "../fonts/SourceCodePro-Bold.ttf";
import { colors } from "../styles/styles";
import { Transition } from 'react-transition-group';
import { sleep } from "./sleep";

const WelcomeMessage = () => {

    // set fade animation
    const durationCursor = 150;
    const durationTagline = 1000;
    const cursorStyle = {
        transition: `opacity ${durationCursor}ms ease-in-out`,
        opacity: 1,
        textAlign: "center"
    }
    const taglineStyle = {
        transition: `opacity ${durationTagline}ms ease-in-out`,
        opacity: 1,
    }
    const transitionStyles = {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 },
    };
    const [cursor, setCursor] = useState(true);

    // set blinking cursor
    const blinkCursor = async () => {
        for (let i = 0; i < 2; i++) {
            setCursor(false);
            await sleep(250);
            setCursor(true);
            await sleep(250);
        }
        setCursor(false);
        await sleep(250);
        await animateTitle();
    }

    // set incoming text
    const [title, setTitle] = useState("");
    const animateTitle = async () => {
        const endState = "Hi, I'm Michael";
        for (let i = 0; i <= endState.length; i++) {
            setTitle(endState.substring(0, i) + "|");
            await sleep(100);
        }
        setTitle(endState);
        await animateTagline();
    }

    // set tagline
    const [tagline, setTagline] = useState(false);
    const animateTagline = async () => {
        setTagline(true);
    }

    // kickoff the animation on load
    useEffect(() => {
        blinkCursor(setCursor);
    }, []);

    return (
        <div>
            <h1 style={{ fontFamily: "SourceCode", fontSize: "4em", margin: 0, color: colors.light, textAlign: "center" }}>{title}</h1>
            {
                title === "" ? <Transition in={cursor} timeout={durationCursor}>
                    {state => (
                        <div style={{
                            ...cursorStyle,
                            ...transitionStyles[state]
                        }}>
                            <h1 style={{ fontFamily: "SourceCode", fontSize: "4em", margin: 0, color: colors.light }}>|</h1>
                        </div>
                    )}
                </Transition>
                    : <></>
            }
            <Transition in={tagline} timeout={durationTagline}>
                {state => (
                    <div style={{
                        ...taglineStyle,
                        ...transitionStyles[state]
                    }}>
                        <h3 style={{ fontFamily: "SourceCode", fontSize: "1.5em", margin: "0.75em", color: colors.light, textAlign: "center" }}>I study computer science at ETH Zürich</h3>
                    </div>
                )}
            </Transition>
        </div>
    );
}

export default WelcomeMessage;
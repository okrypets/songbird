const simpleAudio = (audioLink) => {
    const audio =  new Audio(audioLink);
    audio.play();
    return audio;
}

export default simpleAudio;
import whisper
import os

def transcribe_audio(audio_path):
    os.environ["FFMPEG_BINARY"] = r"C:\ffmpeg\bin\ffmpeg.exe" 
    print("Loading Whisper model...")
    model = whisper.load_model("base")  

    print("Transcribing...")
    result = model.transcribe(audio_path,word_timestamps=True,no_speech_threshold=0.8)

    print("Transcription done!\n")
    return result['text'], result['segments']  
def save_as_srt(segments, filename="subtitles.srt"):
    def format_timestamp(seconds):
        h = int(seconds // 3600)
        m = int((seconds % 3600) // 60)
        s = int(seconds % 60)
        ms = int((seconds - int(seconds)) * 1000)
        return f"{h:02}:{m:02}:{s:02},{ms:03}"

    with open(filename, "w", encoding="utf-8") as f:
        for i, segment in enumerate(segments, start=1):
            start = format_timestamp(segment["start"])
            end = format_timestamp(segment["end"])
            text = segment["text"].strip()

            f.write(f"{i}\n{start} --> {end}\n{text}\n\n")

    print(f"Subtitles saved to {filename}")


# Example usage
if __name__ == "__main__":
    audio_file = "outputAudio.wav"
    full_text, segments = transcribe_audio(audio_file)

    # Save subtitles
    save_as_srt(segments, "subtitles.srt")

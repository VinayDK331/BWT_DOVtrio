from textblob import TextBlob


def analyze_sentiment(text):

    blob = TextBlob(text)

    polarity = blob.sentiment.polarity

    if polarity > 0.2:
        sentiment = "positive"
    elif polarity < -0.2:
        sentiment = "negative"
    else:
        sentiment = "neutral"

    score = int((polarity + 1) * 50)

    return {
        "sentiment": sentiment,
        "score": score
    }
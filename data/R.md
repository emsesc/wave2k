## Commands

```r
packages <- c("wordcloud", "tm")

lapply(packages, require , character.only = TRUE)

lyrics_2000 <- readLines("lyrics_2000.txt")

lyrics_2000_text <- Corpus(VectorSource(lyrics_2000))
lyrics_2000_text_clean <- tm_map(lyrics_2000_text, removePunctuation)

lyrics_2000_text_clean <- tm_map(lyrics_2000_text_clean, content_transformer(tolower))
lyrics_2000_text_clean <- tm_map(lyrics_2000_text_clean, removeNumbers)
lyrics_2000_text_clean <- tm_map(lyrics_2000_text_clean, stripWhitespace)
lyrics_2000_text_clean <- tm_map(lyrics_2000_text_clean, removeWords, stopwords('english'))
words_to_remove <- c("bridge", "chorus")
lyrics_2000_text_clean <- tm_map(lyrics_2000_text_clean, removeWords, words_to_remove)

wordcloud(lyrics_2000_text_clean, scale = c(2, 1), min.freq = 50, colors = rainbow(30))
```

```R
library(dplyr)
library(tidytext)
library(ggplot2)

lyrics_2000 <- readLines("http://www.textfiles.com/etext/FICTION/barrie-peter-277.txt")

# Check peter pan:
head(lyrics_2000, n = 20)
lyrics_2000_df <- data_frame(Text = peter_pan) # tibble aka neater data frame

head(lyrics_2000_df, n = 20)
lyrics_2000 <- lyrics_2000_df %>% 
                  unnest_tokens(output = word, input = Text) 
lyrics_2000 <- lyrics_2000 %>%
                   anti_join(stop_words) # Remove stop words in peter_words
peter_wordcounts <- peter_words %>% count(word, sort = TRUE)

head(peter_wordcounts)
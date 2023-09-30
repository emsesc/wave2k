```R
library(dplyr)
library(tidytext)
library(ggplot2)

lyrics_2010 <- readLines("~/Documents/GitHub/omg-spotify/data/lyrics/2010/lyrics_2010.txt")
# Check peter pan:
head(lyrics_2010, n = 20)
lyrics_2010_df <- data_frame(Text = lyrics_2010) # tibble aka neater data frame

head(lyrics_2010_df, n = 20)
lyrics_2010_words <- lyrics_2010_df %>% 
                  unnest_tokens(output = word, input = Text) 
lyrics_2010_words <- lyrics_2010_words %>%
                   anti_join(stop_words) # Remove stop words in peter_words
lyrics_2010_wordcounts <- lyrics_2010_words %>% count(word, sort = TRUE)

head(lyrics_2010_wordcounts)
```

```R
# Load the dplyr package (if not already installed)
install.packages("dplyr")
library(dplyr)

# Create an empty data frame to store the merged data
merged_lyrics <- data.frame()

# Loop through years from 2000 to 2010
for (year in 2000:2010) {
  # Construct the data frame name
  df_name <- paste0("lyrics_", year, "_wordcounts")
  
  # Check if the data frame exists
  if (exists(df_name)) {
    # Get the data frame for the current year
    current_df <- get(df_name)
    
    # Add a new column with the year
    current_df <- current_df %>% mutate(Year = year)
    
    # Bind the data frame for the current year to the merged_lyrics data frame
    merged_lyrics <- bind_rows(merged_lyrics, current_df)
  }
}

# Print the merged data frame
print(merged_lyrics)
```

```r
# Load the ggplot2 package (if not already installed)
library(ggplot2)

# Replace "merged_lyrics" with your actual data frame name
# Replace "love" with the word you want to graph
word_to_graph <- "love"

# Filter the data frame for the specific word
word_data <- merged_lyrics %>%
  filter(word == word_to_graph)

# Create a line plot using ggplot2
plot <- ggplot(word_data, aes(x = Year, y = n)) +
  geom_line() +
  geom_point() +
  labs(
    title = paste("Frequency of", word_to_graph, "Over the Years"),
    x = "Year",
    y = "Frequency"
  ) +
  scale_x_continuous(breaks = seq(min(word_data$Year), max(word_data$Year), by = 1), labels = as.character(seq(min(word_data$Year), max(word_data$Year), by = 1)))

# Display the plot
print(plot)
```
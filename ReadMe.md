# **Moody**

### **Project Overview**

Moody is an app that sets a mood based on the current weather. As you go about your day, maybe you want a soundtrack for your life and a book to read. Moody looks at the current weather in your area and provides a playlist based on what the weather is right now and suggests a book you may enjoy!

### **User Experience**

When the page first loads, you’ll see a big image of the moody logo. The page will ask you if you’d like to share location. You should select “Allow”, or Moody will not load. Once you give permission to share your location, the full Moody page will load: a playlist will appear, the current weather will be displayed, and a book recommendation will appear. The playlist can be played from within the page. There is also a link for the user to purchase the book recommendation on Amazon.

Examples of what different weather conditions look like:

Sunny:
![global execution context with no code](/images/sunny_screenshot.png)

Cloudy:
![global execution context with no code](/images/cloudy_screenshot.png)


### **Logic**

Moody generates “moods” based on the weather. The program is set in a series of if statements - for example, if the weather is sunny, display the playlist and book recommendation for sunny weather. The AccuWeather Current Conditions API always returns a weather icon for around 40 different weather conditions. For Moody, we’ve lumped these condition icons into five general categories: sunny, cloudy, rainy, stormy, and snowy. If the API returns a weather icon falling in the sunny category, the sunny playlist and book recommendation will be displayed.

### **Issues and other nice-to-haves:**
The free version of AccuWeather only allows 50 calls per day, so if a lot of people are using Moody, you might be out of luck! 
It would be neat to have the ability to rate a playlist and comment on it (and have those ratings saved for future reference).
It would be cool to add book recommendations in a carousel format so that the user can scroll through different options, instead of only having one option.
Future releases will add more moods for different weather conditions (e.g. night versus day, windy, freezing rain, sleet, etc). Currently, if AccuWeather says the weather is “hot”, “cold”, or “windy”, the weather display box will just show a message saying ‘Moody recommendation coming soon’.

### **Project Link**
 https://moody-project.github.io/Moody-Music/

### **Authors:**
Nora Byrd (Github: noracbyrd; Email: noracbyrd@gmail.com)
Orlando Corona (Github: OCoro03; Email: corona.orlando@gmail.com)
Zaid Fadel (Github: zaidfadel89; Email: zaid.fadel89@gmail.com)

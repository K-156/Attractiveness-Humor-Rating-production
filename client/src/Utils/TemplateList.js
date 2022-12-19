const templates = {
    1: "Template 1 - Profile Rating",
    2: "Template 2 - Rank",
    3: "Template 3 - Audio Rating", 
    4: "Template 4 - Introduction Rating",
    5: "Template 5 - Chatbox",
    6: "Template 6 - General"
}

const templatePurpose = {
    1: "View and rate the profiles",
    2: "Drag and drop to rank the profiles",
    3: "Listen to audio and answer the questions", 
    4: "Read the introduction and answer the questions",
    5: "Select one pre-written message to the candidate",
    6: "Customise text"
}

const templateSamples = {
    1: ["1_Profile Summary Page", "2_Profile Description Page", "3_Profile Rating Page"],
    2: ["1_Rank Page", "2_Rank Page (dragged)"],
    3: ["1_Audio Page", "2_Audio Rating Page"], 
    4: ["1_Written Intro Page"],
    5: ["1_Pre-written message Page", "2_Pre-written message Page (Selected)"],
    6: ["1_Complete survey Page"]
}

export { 
    templates, 
    templatePurpose,
    templateSamples
};

const series = [
    {
      title: "Tiger King",
      description: "An exploration of big cat breeding and its bizarre underworld, populated by eccentric characters.",
      genre: "documentaries",
      maturity: "18",
      slug: "tiger-king",
      docId: "s1"
    },
    {
      title: "Amanda Knox",
      description: "Amanda Marie Knox is an American woman who spent almost four years in an Italian prison.",
      genre: "documentaries",
      maturity: "12",
      slug: "amanda-knox",
      docId: "s2"
    },
    {
      title: "Citizenfour",
      description: "Citizenfour is a 2014 documentary film directed by Laura Poitras, concerning Edward Snowden and the NSA spying scandal.",
      genre: "documentaries",
      maturity: "12",
      slug: "citizenfour",
      docId: "s3"
    },
    {
      title: "Super Size Me",
      description: "Director Morgan Spurlock's social experiment in fast-food gastronomy sees him attempting to subsist uniquely on food from the McDonalds",
      genre: "documentaries",
      maturity: "12",
      slug: "super-size-me",
      docId: "s4"
    },
    {
      title: "Man on Wire",
      description: "Filmmaker James Marsh masterfully recreates high-wire daredevil Philippe Petit's 1974 stunt walking on a wire across the Twin Towers.",
      genre: "documentaries",
      maturity: "12",
      slug: "man-on-wire",
      docId: "s5"
    },
    {
      title: "The Office",
      description: "A motley group of office workers go through hilarious misadventures at the Scranton, Pennsylvania, branch of the Dunder Mifflin Paper Company.",
      genre: "comedies",
      maturity: "15",
      slug: "the-office",
      docId: "s6"
    },
    {
      title: "Arrested Development",
      description: "The Bluth family, once a prominent name in the business, loses everything after the head patriarch gets convicted for fraud.",
      genre: "comedies",
      maturity: "15",
      slug: "arrested-development",
      docId: "s7"
    },
    {
      title: "Curb Your Enthusiasm",
      description: "Larry David, a famous television writer and producer, gets into various misadventures with his friends and celebrity colleagues in Los Angeles.",
      genre: "comedies",
      maturity: "15",
      slug: "curb-your-enthusiasm",
      docId: "s8"
    },
    {
      title: "Family Guy",
      description: "Peter Griffin and his family of two teenagers, a smart dog, a devilish baby and his wife find themselves in some of the most hilarious scenarios.",
      genre: "comedies",
      maturity: "15",
      slug: "family-guy",
      docId: "s9"
    },
    {
      title: "South Park",
      description: "Four young, schoolgoing boys, Stan Marsh, Kyle Broflovski, Eric Cartman and Kenny McCormick, who live in South Park set out on various adventures.",
      genre: "comedies",
      maturity: "15",
      slug: "south-park",
      docId: "s10"
    },
    {
      title: "Peppa Pig",
      description: "Peppa, an outgoing preschool pig, participates in many energetic activities. She learns something new every day and has a lot of fun with her family and friends.",
      genre: "children",
      maturity: "0",
      slug: "peppa-pig",
      docId: "s11"
    },
    {
      title: "Dora The Explorer",
      description: "Dora, a seven-year-old girl of Latin American descent, embarks upon numerous adventures in the wilderness with her friend Boots, a monkey, and a variety of fun and useful tools.",
      genre: "children",
      maturity: "0",
      slug: "dora-the-explorer",
      docId: "s12"
    },
    {
      title: "PAW Patrol",
      description: "Six brave puppies, captained by a tech-savvy ten-year-old boy, Ryder, work together to accomplish high-stakes rescue missions to safeguard the residents of the Adventure Bay community.",
      genre: "children",
      maturity: "0",
      slug: "paw-patrol",
      docId: "s13"
    },
    {
      title: "Arthur",
      description: "Bespectacled aardvark Arthur Read demonstrates to kids how to deal with such childhood traumas and challenges as homework, teachers and bullies.",
      genre: "children",
      maturity: "0",
      slug: "arthur",
      docId: "s14"
    },
    {
      title: "SpongeBob",
      description: "A yellow sea sponge named SpongeBob SquarePants lives in the city of Bikini Bottom deep in the Pacific Ocean.",
      genre: "children",
      maturity: "0",
      slug: "spongebob",
      docId: "s15"
    },
    {
      title: "Making a Murderer",
      description: "Exonerated after spending nearly two decades in prison for a crime he did not commit, Steven Avery filed suit against Manitowoc County, Wis., and several individuals involved with his arrest.",
      genre: "crime",
      maturity: "18",
      slug: "making-a-murderer",
      docId: "s16"
    },
    {
      title: "Long Shot",
      description: "An innocent man is accused of murder, leading his attorney on a wild chase to confirm his alibi using raw footage from a television show.",
      genre: "crime",
      maturity: "18",
      slug: "long-shot",
      docId: "s17"
    },
    {
      title: "The Confession Killer",
      description: "Henry Lee Lucas was an American convicted serial killer whose crimes spanned from 1960 to 1983. He was convicted of murdering eleven people and condemned to death for the murder of Debra Jackson, although his sentence would be commuted to life in prison in 1998.",
      genre: "crime",
      maturity: "18",
      slug: "the-confession-killer",
      docId: "s18"
    },
    {
      title: "The Innocent Man",
      description: "Henry Lee Lucas was an American convicted serial killer whose crimes spanned from 1960 to 1983. He was convicted of murdering eleven people and condemned to death for the murder of Debra Jackson.",
      genre: "crime",
      maturity: "18",
      slug: "the-innocent-man",
      docId: "s19"
    },
    {
      title: "The Staircase",
      description: "In 2001 novelist Michael Peterson's wife died, and he claimed she perished after falling down stairs at their home. The medical examiner, however, determined that she had been beaten with a weapon",
      genre: "crime",
      maturity: "18",
      slug: "the-staircase",
      docId: "s20"
    },
    {
      title: "Good Will Hunting",
      description: "Will Hunting, a genius in mathematics, solves all the difficult mathematical problems. When he faces an emotional crisis, he takes help from psychiatrist Dr Sean Maguireto, who helps him recover.",
      genre: "feel-good",
      maturity: "12",
      slug: "good-will-hunting",
      docId: "s21"
    },
    {
      title: "Forrest Gump",
      description: "Forrest Gump, a man with a low IQ, joins the army for service where he meets Dan and Bubba. However, he cannot stop thinking about his childhood sweetheart Jenny Curran, whose life is messed up.",
      genre: "feel-good",
      maturity: "12",
      slug: "forrest-gump",
      docId: "s22"
    },
    {
      title: "Juno",
      description: "Social misfit Juno protects herself with a caustic wit, but her unplanned pregnancy has the teen getting more involved in the lives of her baby's adoptive parents than she expected.",
      genre: "feel-good",
      maturity: "12",
      slug: "juno",
      docId: "s23"
    },
    {
      title: "Midnight In Paris",
      description: "Gil arrives with his fiancee and her family in Paris for a vacation, even as he tries to finish his debut novel. He is beguiled by the city, which takes him to a time past, away from his fiancee.",
      genre: "feel-good",
      maturity: "12",
      slug: "midnight-in-paris",
      docId: "s24"
    },
    {
      title: "School of Rock",
      description: "Dewey Finn, an amateur rock enthusiast, slyly takes up his friend's substitute teacher's job. Bearing no qualifications for it, he instead starts training the students to form a band.",
      genre: "feel-good",
      maturity: "12",
      slug: "school-of-rock",
      docId: "s25"
    }
  ];
  
  const films = [
    {
      title: "The Prestige",
      description: "Two friends and fellow magicians become bitter enemies after a sudden tragedy. As they devote themselves to this rivalry, they make sacrifices that bring them fame but with terrible consequences.",
      genre: "drama",
      maturity: "15",
      slug: "the-prestige",
      docId: "f1"
    },
    {
      title: "Fight Club",
      description: "Discontented with his capitalistic lifestyle, a white-collared insomniac forms an underground fight club with Tyler, a careless soap salesman. The project soon spirals down into something sinister.",
      genre: "drama",
      maturity: "15",
      slug: "fight-club",
      docId: "f2"
    },
    {
      title: "Kings Speech",
      description: "King George VI tries to overcome his stammering problem with the help of speech therapist Lionel Logue and makes himself worthy enough to lead his country through World War II.",
      genre: "drama",
      maturity: "15",
      slug: "kings-speech",
      docId: "f3"
    },
    {
      title: "The Revenant",
      description: "Hugh Glass, a legendary frontiersman, is severely injured in a bear attack and is abandoned by his hunting crew. He uses his skills to survive and take revenge on his companion, who betrayed him.",
      genre: "drama",
      maturity: "15",
      slug: "the-revenant",
      docId: "f4"
    },
    {
      title: "The Social Network",
      description: "Mark Zuckerberg creates a social networking site, Facebook, with the help of his friend Eduardo Saverin. But soon, a string of lies tears their relationship apart even as Facebook connects people.",
      genre: "drama",
      maturity: "12",
      slug: "the-social-network",
      docId: "f5"
    },
    {
      title: "Shutter Island",
      description: "Teddy Daniels and Chuck Aule, two US marshals, are sent to an asylum on a remote island in order to investigate the disappearance of a patient, where Teddy uncovers a shocking truth about the place.",
      genre: "suspense",
      maturity: "15",
      slug: "shutter-island",
      docId: "f6"
    },
    {
      title: "Gone Girl",
      description: "Nick Dunne discovers that the entire media focus has shifted on him when his wife Amy Dunne disappears on the day of their fifth wedding anniversary.",
      genre: "suspense",
      maturity: "15",
      slug: "gone-girl",
      docId: "f7"
    },
    {
      title: "Prisoners",
      description: "When the police take time to find Keller Dover's daughter and her friend, he decides to go on a search himself. His desperation leads him closer to finding the truth and also jeopardises his own life.",
      genre: "suspense",
      maturity: "15",
      slug: "prisoners",
      docId: "f8"
    },
    {
      title: "Seven",
      description: "A serial killer begins murdering people according to the seven deadly sins. Two detectives, one new to the city and the other about to retire, are tasked with apprehending the criminal.",
      genre: "suspense",
      maturity: "15",
      slug: "seven",
      docId: "f9"
    },
    {
      title: "Zodiac",
      description: "Robert Graysmith, a cartoonist by profession, finds himself obsessively thinking about the Zodiac killer. He uses his puzzle-solving abilities to get closer to revealing the identity of the killer.",
      genre: "suspense",
      maturity: "15",
      slug: "zodiac",
      docId: "f10"
    },
    {
      title: "Hotel Transylvania",
      description: "Dracula, who owns a high-end resort for monsters, attempts to keep his daughter from falling in love with Jonathan, a human.",
      genre: "children",
      maturity: "0",
      slug: "hotel-transylvania",
      docId: "f11"
    },
    {
      title: "Despicable Me",
      description: "Gru, a criminal mastermind, adopts three orphans as pawns to carry out the biggest heist in history. His life takes an unexpected turn when the little girls see him as their potential father.",
      genre: "children",
      maturity: "0",
      slug: "despicable-me",
      docId: "f12"
    },
    {
      title: "Frozen",
      description: "Anna sets out on a journey with an iceman, Kristoff, and his reindeer, Sven, in order to find her sister, Elsa, who has the power to convert any object or person into ice.",
      genre: "children",
      maturity: "0",
      slug: "frozen",
      docId: "f13"
    },
    {
      title: "Spirited Away",
      description: "In this animated feature by noted Japanese director Hayao Miyazaki, 10-year-old Chihiro (Rumi Hiiragi) and her parents (Takashi Naitô, Yasuko Sawaguchi) stumble upon a seemingly abandoned amusement park.",
      genre: "children",
      maturity: "0",
      slug: "spirited-away",
      docId: "f14"
    },
    {
      title: "Up",
      description: "Carl, an old widower, goes off on an adventure in his flying house in search of Paradise Falls, his wife's dream destination.",
      genre: "children",
      maturity: "0",
      slug: "up",
      docId: "f15"
    },
    {
      title: "Joker",
      description: "Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he walks the streets of Gotham City.",
      genre: "thriller",
      maturity: "15",
      slug: "joker",
      docId: "f16"
    },
    {
      title: "A Quiet Place",
      description: "The Abbott family must now face the terrors of the outside world as they fight for survival in silence. Forced to venture into the unknown, they realize that the creatures that hunt by sound are not the only threats that lurk beyond the sand path.",
      genre: "thriller",
      maturity: "15",
      slug: "a-quiet-place",
      docId: "f17"
    },
    {
      title: "Black Swan",
      description: "Nina, a ballerina, gets the chance to play the White Swan, Princess Odette. But she finds herself slipping into madness when Thomas, the artistic director, decides that Lily might fit the role better.",
      genre: "thriller",
      maturity: "15",
      slug: "black-swan",
      docId:"f18"
    },
    {
        title: "Nightcrawler",
        description: "Louis Bloom, a petty thief, realises that he can make money by capturing photographs of criminal activities and starts resorting to extreme tactics to get them.",
        genre: "thriller",
        maturity: "15",
        slug: "nightcrawler",
        docId: "f19"
      },
      {
        title: "The Silence of The Lambs",
        description: "Clarice Starling, an FBI agent, seeks help from Hannibal Lecter, a psychopathic serial killer and former psychiatrist, in order to apprehend another serial killer who has been claiming female victims.",
        genre: "thriller",
        maturity: "15",
        slug: "the-silence-of-the-lambs",
        docId: "f20"
      },
      {
        title: "A Star Is Born",
        description: "After falling in love with struggling artist Ally, Jackson, a musician, coaxes her to follow her dreams, while he battles with alcoholism and his personal demons.",
        genre: "romance",
        maturity: "15",
        slug: "a-star-is-born",
        docId: "f21"
      },
      {
        title: "Blue Valentine",
        description: "Dean and Cynthia are married with a daughter and their marriage is about to fall apart. Both come from dysfunctional families and struggle to make sense of their relationship.",
        genre: "romance",
        maturity: "15",
        slug: "blue-valentine",
        docId: "f22"
      },
      {
        title: "La La Land",
        description: "Sebastian (Ryan Gosling) and Mia (Emma Stone) are drawn together by their common desire to do what they love. But as success mounts they are faced with decisions that begin...",
        genre: "romance",
        maturity: "15",
        slug: "la-la-land",
        docId: "f23"
      },
      {
        title: "The Notebook",
        description: "Duke reads the story of Allie and Noah, two lovers who were separated by fate, to Ms Hamilton, an old woman who suffers from Alzheimer's, on a daily basis out of his notebook.",
        genre: "romance",
        maturity: "15",
        slug: "the-notebook",
        docId: "f24"
      },
      {
        title: "Titanic",
        description: "Seventeen-year-old Rose hails from an aristocratic family and is set to be married. When she boards the Titanic, she meets Jack Dawson, an artist, and falls in love with him.",
        genre: "romance",
        maturity: "15",
        slug: "titanic",
        docId: "f25"
      }
    ];
      
  export { series, films };
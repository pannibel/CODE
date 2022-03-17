/* selecting the text element in the html*/
const textElement = document.getElementById("text");
/* selecting the option buttons container */
const optionButtonsElement = document.getElementById("option-buttons");
/* this is going to keep track of where our character is */
let state = {}

/* this is going to start the game */
function startGame() {
    state = {};
    showClue(32);
}

/* this is going to display whichever option we're on
it's going to take a particular index of a text node --> with clueIndex */
function showClue(clueIndex) {
    const clue = clues.find(clue => clue.id === clueIndex)
    textElement.innerText = clue.text;

    /* this is removing the options */
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    /* adding the current options */
    clue.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement("button")
            button.innerText = option.text
            button.classList.add("btn")
            button.addEventListener("click", () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

/* this is going to show our current options*/
function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

/* this is going to happen every time we select an option */
function selectOption(option) {
    const nextClueIndex = option.nextText;
    state = Object.assign(state, option.setState)
    showClue(nextClueIndex)
}

const clues = [
    {
        id: 1,
        text: 'YOU FIND YOURSELF IN THE HALL. FROM HERE YOU CAN START LOOKING AROUND IN ONE OF TWO ROOMS. WHICH ONE DO YOU CHOOSE?',
        options: [
            {
                text: 'KITCHEN',
                nextText: 2,
            },
            {
                text: 'STUDY',
                nextText: 3,
            }
        ]
    },

    {
        id: 2,
        text: 'APPARENTLY, THE MURDER DID NOT HAPPEN IN THE KITCHEN BECAUSE THE COOK WAS THERE THE WHOLE TIME. BUT THERE ARE TWO POTENTIAL MURDER WEAPONS HERE. WHICH ONE DO YOU TAKE A CLOSER LOOK AT?',
        options: [
            {
                text: 'CANDLESTICK',
                nextText: 4,
            },
            {
                text: 'DAGGER',
                nextText: 5,
            }
        ]
    },
    {
        id: 3,
        text: 'AS IT TURNS OUT, THE MURDER COULD NOT HAPPEN IN THE STUDY BECAUSE IT WAS BEING RENOVATED DURING THAT TIME. FORTUNATELY, YOU MEET TWO PEOPLE HERE. WHO DO YOU START QUESTIONING?',
        options: [
            {
                text: 'MISS SCARLETT',
                nextText: 6,
            },
            {
                text: 'REVEREND GREEN',
                nextText: 7,
            }
        ]
    },
    {
        id: 4,
        text: 'THE CANDLESTICK SEEMS UNTOUCHED, YOU CONCLUDE THAT IT WAS NOT THE MURDER WEAPON. TWO PEOPLE ENTER THE ROOM. WHO DO YOU WANT TO ASK SOME QUESTIONS FROM?',
        options: [
            {
                text: 'COLONEL MUSTARD',
                setState: { killer: true },
                nextText: 8,
            },
            {
                text: 'PROFESSOR PLUM',
                nextText: 9,
            }
        ]
    },
    {
        id: 5,
        text: 'THE DAGGER COULD BE A GREAT MURDER WEAPON, BUT UNFORTUNATELY, IT DOES NOT MATCH THE CAUSE OF DEATH. TWO PEOPLE WALK BY THE ROOM AND YOU DECIDE TO ASK SOME QUESTIONS FROM ONE OF THEM. WHO INTERESTS YOU MOST?',
        options: [
            {
                text: 'MRS PEACOCK',
                nextText: 10,
            },
            {
                text: 'MS WHITE',
                nextText: 11,
            }
        ]
    },
    {
        id: 6,
        text: 'MISS SCARLETT WAS AT A FRIENDS HOUSE AT THE TIME OF THE MURDER, SHE CAN NOT BE THE KILLER. YOU DECIDE TO INVESTIGATE A POTENTIAL MURDER WEAPON. WHICH ONE DO YOU CHOOSE?',
        options: [
            {
                text: 'LEAD PIPE',
                nextText: 12,
            },
            {
                text: 'REVOLVER',
                setState: { weapon: true },
                nextText: 13,
            }
        ]
    },
    {
        id: 7,
        text: 'REVEREND GREEN HAD A MASS AT THE TIME OF THE MURDER, AT LEAST 50 PEOPLE CAN CONFIRM THIS ALIBI. HE CAN NOT BE THE KILLER. YOU DECIDE TO INVESTIGATE A POTENTIAL MURDER WEAPON. WHICH ONE DO YOU CHOOSE?',
        options: [
            {
                text: 'WRENCH',
                nextText: 14,
            },
            {
                text: 'ROPE',
                nextText: 15,
            }
        ]
    },
    {
        id: 8,
        text: 'COLONEL MUSTARD HAS A LOUSY ALIBI AND AS IT TURNS OUT, CERTAINLY HAS A MOTIVE. HE COULD BE THE KILLER IF YOU FIND BOTH THE MURDER WEAPON AND THE PLACE OF THE MURDER WITH HIS FINGERPRINTS. WHICH ROOM DO YOU INVESTIGATE NEXT?',
        options: [
            {
                text: 'LOUNGE',
                nextText: 16,
            },
            {
                text: 'BILLIARD ROOM',
                nextText: 17,
            }
        ]
    },
    {
        id: 9,
        text: 'PROFESSOR PLUM WAS TEACHING A CLASS AT UNIVERSITY AT THE TIME OF THE MURDER, AT LEAST 20 STUDENTS SUPPORT HIS ALIBI. HE CAN NOT BE THE KILLER. YOU DECIDE TO CONTINUE THE INVESTIGATION IN ANOTHER ROOM. WHICH ONE DO YOU CHOOSE?',
        options: [
            {
                text: 'CONSERVATORY',
                setState: { place: true },
                nextText: 18,
            },
            {
                text: 'DINING ROOM',
                nextText: 19,
            }
        ]
    },
    {
        id: 10,
        text: 'MRS PEACOCK WAS WITH HER MOTHER IN HER HOMETOWN AT THE TIME OF THE MURDER. SHE CAN NOT BE THE KILLER. YOU DECIDE TO CONTINUE THE INVESTIGATION IN ANOTHER ROOM. WHICH ONE DO YOU CHOOSE?',
        options: [
            {
                text: 'LOUNGE',
                nextText: 16,
            },
            {
                text: 'BILLIARD ROOM',
                nextText: 17,
            }
        ]
    },
    {
        id: 11,
        text: 'MS WHITE WAS SHOPPING WITH HER FIANCEE AT THE TIME OF THE MURDER. SHE CAN NOT BE THE KILLER. YOU DECIDE TO CONTINUE THE INVESTIGATION IN ANOTHER ROOM. WHICH ONE DO YOU CHOOSE?',
        options: [
            {
                text: 'CONSERVATORY',
                setState: { place: true },
                nextText: 18,
            },
            {
                text: 'DINING ROOM',
                nextText: 19,
            }
        ]
    },
    {
        id: 12,
        text: 'THE LEAD PIPE SEEMS UNTOUCHED AND KNOWING THE CAUSE OF DEATH, THE KILLER CERTAINLY DID NOT USE IT FOR THE MURDER. YOU DECIDE TO CONTINUE THE INVESTIGATION IN ANOTHER ROOM. WHICH ONE DO YOU CHOOSE?',
        options: [
            {
                text: 'LOUNGE',
                nextText: 16,
            },
            {
                text: 'BILLIARD ROOM',
                nextText: 17,
            }
        ]
    },
    {
        id: 13,
        text: 'THE CAUSE OF DEATH WAS TWO SHOTS IN THE CHEST SO YOU CONCLUDE THAT THE REVOLVER IS THE MURDER WEAPON. WHICH ROOM DO YOU INVESTIGATE NEXT?',
        options: [
            {
                text: 'CONSERVATORY',
                setState: { place: true },
                nextText: 18,
            },
            {
                text: 'DINING ROOM',
                nextText: 19,
            }
        ]
    },
    {
        id: 14,
        text: 'KILLING SOMEONE WITH A WRENCH SEEMS EFFECTIVE BUT UNFORTUNATELY, IN THIS MURDER CASE, THE FATAL WOUNDS DO NOT MATCH THIS OBJECT. YOU DECIDE TO CONTINUE THE INVESTIGATION IN ANOTHER ROOM. WHICH ONE DO YOU CHOOSE?',
        options: [
            {
                text: 'LOUNGE',
                nextText: 16,
            },
            {
                text: 'BILLIARD ROOM',
                nextText: 17,
            }
        ]
    },
    {
        id: 15,
        text: 'ROPE IS GREAT IF YOU WANT TO STRANGLE SOMEONE BUT IN THIS SCENARIO THE VICTIM WAS KILLED ANOTHER WAY. YOU DECIDE TO CONTINUE THE INVESTIGATION IN ANOTHER ROOM. WHICH ONE DO YOU CHOOSE?',
        options: [
            {
                text: 'CONSERVATORY',
                setState: { place: true },
                nextText: 18,
            },
            {
                text: 'DINING ROOM',
                nextText: 19,
            }
        ]
    },
    {
        id: 16,
        text: 'THE LOUNGE SEEMS TOO CLEAN AND QUIET AND YOU CONCLUDE THAT THE MURDER DID NOT HAPPEN HERE. THERE ARE TWO SUSPICIOUS OBJECTS YOU MIGHT WANT TO TAKE A CLOSER LOOK AT THOUGH. WHICH ONE DO YOU CHOOSE?',
        options: [
            {
                text: 'ROPE',
                nextText: 20,
            },
            {
                text: 'REVOLVER',
                setState: { weapon: true },
                nextText: 21,
            }
        ]
    },
    {
        id: 17,
        text: 'THE OLD BUTLER HAS HIS ROOM NEXT TO THE BILLIARD ROOM AND SWEARS ON HIS LIFE THAT THE MURDER DID NOT HAPPEN HERE. YOU DECIDE TO BELIEVE HIM. TWO PEOPLE PLAY IN HERE CURRENTLY, WHICH ONE DO YOU WANNA HAVE A TALK WITH?',
        options: [
            {
                text: 'PROFESSOR PLUM',
                nextText: 22,
            },
            {
                text: 'MS WHITE',
                nextText: 23,
            }
        ]
    },
    {
        id: 18,
        text: 'YOU FIND THE VICTIMS BLOOD ON SEVERAL SURFACES AND YOU HAVE NO REASON TO DOUBT THAT THE MURDER TOOK PLACE IN THE CONSERVATORY. THERE ARE ALSO TWO POTENTIAL MURDER WEAPONS HERE. WHICH ONE DO YOU WANT TO TAKE A CLOSER LOOK AT?',
        options: [
            {
                text: 'LEAD PIPE',
                nextText: 24,
            },
            {
                text: 'WRENCH',
                nextText: 25,
            },
            {
                text: 'I KNOW ALL THREE CLUES NOW',
                requiredState: (currentState) => currentState.killer && currentState.weapon && currentState.place,
                setState: { place: true },
                nextText: 31,
            },
        ]
    },
    {
        id: 19,
        text: 'THE DINING ROOM SHOWS NO SIGNS OF INTRUSION OR BLOOD OF THE VICTIM, SO YOU CONCLUDE THAT THE MURDER DID NOT HAPPEN HERE. TWO PEOPLE ARE CHATTING OVER A CUP OF TEA AT THE TABLE. WHO DO YOU WANT TO ASK SOME QUESTIONS FROM?',
        options: [
            {
                text: 'MRS PEACOCK',
                nextText: 26,
            },
            {
                text: 'COLONEL MUSTARD',
                setState: { killer: true },
                nextText: 27,
            }
        ]
    },
    {
        id: 20,
        text: 'ROPE IS GREAT IF YOU WANT TO STRANGLE SOMEONE BUT IN THIS SCENARIO THE VICTIM WAS KILLED ANOTHER WAY. YOU DECIDE TO CONTINUE THE INVESTIGATION IN ANOTHER ROOM. WHICH ONE DO YOU CHOOSE?',
        options: [
            {
                text: 'BILLIARD ROOM',
                nextText: 28,
            },
            {
                text: 'DINING ROOM',
                nextText: 29,
            }
        ]
    },
    {
        id: 21,
        text: 'THE CAUSE OF DEATH WAS TWO SHOTS IN THE CHEST SO YOU CONCLUDE THAT THE REVOLVER IS THE MURDER WEAPON. WHICH ROOM DO YOU INVESTIGATE NEXT?',
        options: [
            {
                text: 'LOUNGE',
                nextText: 29,
            },
            {
                text: 'CONSERVATORY',
                setState: { place: true },
                nextText: 30,
            }
        ]
    },
    {
        id: 22,
        text: 'PROFESSOR PLUM WAS TEACHING A CLASS AT UNIVERSITY AT THE TIME OF THE MURDER, AT LEAST 20 STUDENTS SUPPORT HIS ALIBI. HE CAN NOT BE THE KILLER. YOU DECIDE TO CONTINUE THE INVESTIGATION IN ANOTHER ROOM. WHICH ONE DO YOU CHOOSE?',
        options: [
            {
                text: 'BILLIARD ROOM',
                nextText: 28,
            },
            {
                text: 'DINING ROOM',
                nextText: 29,
            }
        ]
    },
    {
        id: 23,
        text: 'MS WHITE WAS SHOPPING WITH HER FIANCEE AT THE TIME OF THE MURDER. SHE CAN NOT BE THE KILLER. YOU DECIDE TO CONTINUE THE INVESTIGATION IN ANOTHER ROOM. WHICH ONE DO YOU CHOOSE?',
        options: [
            {
                text: 'LOUNGE',
                nextText: 29,
            },
            {
                text: 'CONSERVATORY',
                setState: { place: true },
                nextText: 30,
            }
        ]
    },
    {
        id: 24,
        text: 'THE LEAD PIPE SEEMS UNTOUCHED AND KNOWING THE CAUSE OF DEATH, THE KILLER CERTAINLY DID NOT USE IT FOR THE MURDER. YOU DECIDE TO CONTINUE THE INVESTIGATION IN ANOTHER ROOM. WHICH ONE DO YOU CHOOSE?',
        options: [
            {
                text: 'BILLIARD ROOM',
                nextText: 28,
            },
            {
                text: 'DINING ROOM',
                nextText: 29,
            }
        ]
    },
    {
        id: 25,
        text: 'KILLING SOMEONE WITH A WRENCH SEEMS EFFECTIVE BUT UNFORTUNATELY, IN THIS MURDER CASE, THE FATAL WOUNDS DO NOT MATCH THIS OBJECT. YOU DECIDE TO CONTINUE THE INVESTIGATION IN ANOTHER ROOM. WHICH ONE DO YOU CHOOSE?',
        options: [
            {
                text: 'LOUNGE',
                nextText: 29,
            },
            {
                text: 'CONSERVATORY',
                setState: { place: true },
                nextText: 30,
            }
        ]
    },
    {
        id: 26,
        text: 'MRS PEACOCK WAS WITH HER MOTHER IN HER HOMETOWN AT THE TIME OF THE MURDER. SHE CAN NOT BE THE KILLER. YOU DECIDE TO CONTINUE THE INVESTIGATION IN ANOTHER ROOM. WHICH ONE DO YOU CHOOSE?',
        options: [
            {
                text: 'BILLIARD ROOM',
                nextText: 28,
            },
            {
                text: 'DINING ROOM',
                nextText: 29,
            }
        ]
    },
    {
        id: 27,
        text: 'COLONEL MUSTARD HAS A LOUSY ALIBI AND AS IT TURNS OUT, CERTAINLY HAS A MOTIVE. HE COULD BE THE KILLER IF YOU FIND BOTH THE MURDER WEAPON AND THE PLACE OF THE MURDER WITH HIS FINGERPRINTS. WHICH ROOM DO YOU INVESTIGATE NEXT?',
        options: [
            {
                text: 'LOUNGE',
                nextText: 29,
            },
            {
                text: 'CONSERVATORY',
                setState: { place: true },
                nextText: 30,
            }
        ]
    },
    {
        id: 28,
        text: 'THE BILLIARD ROOM HAS A SECRET PASSAGE TO THE HALL. YOU DECIDE TO GO BACK THERE.',
        options: [
            {
                text: 'GO BACK TO HALL',
                nextText: 1,
            },
        ]
    },
    {
        id: 29,
        text: 'OH NO! WHILE YOU WERE BUSY INVESTIGATING, THE KILLER HAD THEIR EYES ON YOU AND NOW THEY GOT A CHANCE TO STOP YOU BEFORE YOU REVEAL EVERY DETAIL OF THE MURDER. IN OTHER WORDS, THEY KILLED YOU TOO. YOU CAN START OVER BUT YOU HAVE TO COLLECT EVERY EVIDENCE AGAIN.',
        options: [
            {
                text: 'START OVER',
                setState: { killer: false, weapon: false, place: false },
                nextText: 32,
            },
        ]
    },
    {
        id: 30,
        text: 'YOU FIND THE VICTIMS BLOOD ON SEVERAL SURFACES AND YOU HAVE NO REASON TO DOUBT THAT THE MURDER TOOK PLACE IN THE CONSERVATORY. DO YOU HAVE ALL THREE CLUES NOW?',
        options: [
            {
                text: 'YES',
                requiredState: (currentState) => currentState.killer && currentState.weapon && currentState.place,
                setState: { place: true },
                nextText: 31,
            },
            {
                text: 'NO, I WANT TO KEEP LOOKING',
                setState: { place: true },
                nextText: 18,
            }
        ]
    },
    {
        id: 31,
        text: 'YOU SUCCESSFULLY COLLECTED ALL THE CLUES. AS YOU KNOW BY NOW, THE VICTIM WAS MURDERED BY COLONEL MUSTARD WITH A REVOLVER IN THE CONSERVATORY. ALL EVIDENCE CHECKS OUT, SO YOU DECIDE TO CLOSE THE INVESTIGATION. CONGRATULATIONS!',
        options: [
            {
                text: 'PLAY AGAIN',
                setState: { killer: false, weapon: false, place: false },
                nextText: 32,
            },
        ]
    },
    {
        id: 32,
        text: 'There was a murder at a huge mansion and all six of its residents are key suspects. You need to find out who the murderer is, what weapon they used and in which room it took place. When you have all the evidence, you need to go to the place of the murder in order to win. If you dont have enough evidence, you can always keep looking, but be careful because the killer has their eyes on you!',
        options: [
            {
                text: 'START INVESTIGATING',
                nextText: 1,
            },
        ]
    },
]

/* calling the startGame function as soon as the page loads */
startGame()
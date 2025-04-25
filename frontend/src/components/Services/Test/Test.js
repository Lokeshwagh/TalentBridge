import React, { useState, useEffect } from "react";
import "./test.css";
import { Link } from "react-router-dom";
const Test = () => {
  const [showModal, setShowModal] = useState(true);
  const [currentSection, setCurrentSection] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(240); // Timer in seconds
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const sections = {
    Aptitude: [
      {
        "question": "If 20% of a number is 50, what is the number?",
        "answers": {
          "a": "200",
          "b": "250",
          "c": "300"
        },
        "correctAnswer": "b"
      },
      {
        "question": "What is the square root of 169?",
        "answers": {
          "a": "12",
          "b": "13",
          "c": "14"
        },
        "correctAnswer": "b"
      },
      {
        "question": "A shopkeeper sold a book for $60 at a 20% profit. What was the cost price?",
        "answers": {
          "a": "$45",
          "b": "$48",
          "c": "$50"
        },
        "correctAnswer": "c"
      },
      {
        "question": "What is 25% of 200?",
        "answers": {
          "a": "40",
          "b": "50",
          "c": "60"
        },
        "correctAnswer": "b"
      },
      {
        "question": "If 3x + 7 = 22, what is the value of x?",
        "answers": {
          "a": "5",
          "b": "6",
          "c": "7"
        },
        "correctAnswer": "a"
      },
      {
        "question": "What is the next number in the series: 1, 4, 9, 16, 25, ?",
        "answers": {
          "a": "36",
          "b": "49",
          "c": "64"
        },
        "correctAnswer": "a"
      },
      {
        "question": "A rectangle has a length of 8 cm and a width of 5 cm. What is its area?",
        "answers": {
          "a": "30 cm²",
          "b": "35 cm²",
          "c": "40 cm²"
        },
        "correctAnswer": "c"
      },
      {
        "question": "What is the HCF (Highest Common Factor) of 24 and 36?",
        "answers": {
          "a": "6",
          "b": "12",
          "c": "18"
        },
        "correctAnswer": "b"
      },
      {
        "question": "If a train travels 300 km in 5 hours, what is its speed?",
        "answers": {
          "a": "50 km/h",
          "b": "60 km/h",
          "c": "70 km/h"
        },
        "correctAnswer": "b"
      },
      {
        "question": "What is the value of 5! (5 factorial)?",
        "answers": {
          "a": "100",
          "b": "120",
          "c": "150"
        },
        "correctAnswer": "b"
      },
      {
        "question": "If the selling price of an item is $80 with a 20% loss, what was the cost price?",
        "answers": {
          "a": "$90",
          "b": "$100",
          "c": "$110"
        },
        "correctAnswer": "b"
      },
      {
        "question": "What is the sum of the first 10 natural numbers?",
        "answers": {
          "a": "45",
          "b": "50",
          "c": "55"
        },
        "correctAnswer": "c"
      },
      {
        "question": "A bag contains 4 red, 6 blue, and 5 green balls. What is the probability of drawing a red ball?",
        "answers": {
          "a": "4/15",
          "b": "1/3",
          "c": "2/5"
        },
        "correctAnswer": "a"
      },
      {
        "question": "What is the missing number in the series: 5, 10, 20, 40, ?",
        "answers": {
          "a": "60",
          "b": "80",
          "c": "100"
        },
        "correctAnswer": "b"
      },
      {
        "question": "If 15 workers can complete a task in 12 days, how many days will 20 workers take?",
        "answers": {
          "a": "8",
          "b": "9",
          "c": "10"
        },
        "correctAnswer": "b"
      },
      {
        "question": "What is the volume of a cube with side length 4 cm?",
        "answers": {
          "a": "16 cm³",
          "b": "32 cm³",
          "c": "64 cm³"
        },
        "correctAnswer": "c"
      },
      {
        "question": "What is the next prime number after 17?",
        "answers": {
          "a": "19",
          "b": "21",
          "c": "23"
        },
        "correctAnswer": "a"
      },
      {
        "question": "If a shirt costs $40 after a 20% discount, what was its original price?",
        "answers": {
          "a": "$48",
          "b": "$50",
          "c": "$52"
        },
        "correctAnswer": "b"
      },
      {
        "question": "What is the sum of the angles in a triangle?",
        "answers": {
          "a": "90°",
          "b": "180°",
          "c": "360°"
        },
        "correctAnswer": "b"
      },
      {
        "question": "What is 3/4 expressed as a percentage?",
        "answers": {
          "a": "65%",
          "b": "75%",
          "c": "85%"
        },
        "correctAnswer": "b"
      },
      {
        "question": "If 2x - 5 = 11, what is the value of x?",
        "answers": {
          "a": "6",
          "b": "7",
          "c": "8"
        },
        "correctAnswer": "c"
      },
      {
        "question": "A circle has a diameter of 14 cm. What is its circumference? (Use π = 22/7)",
        "answers": {
          "a": "44 cm",
          "b": "88 cm",
          "c": "132 cm"
        },
        "correctAnswer": "a"
      },
      {
        "question": "What is the smallest prime number?",
        "answers": {
          "a": "1",
          "b": "2",
          "c": "3"
        },
        "correctAnswer": "b"
      },
      {
        "question": "If 30% of a number is 45, what is the number?",
        "answers": {
          "a": "120",
          "b": "150",
          "c": "180"
        },
        "correctAnswer": "b"
      },
      {
        "question": "What is the average of 10, 20, 30, and 40?",
        "answers": {
          "a": "20",
          "b": "25",
          "c": "30"
        },
        "correctAnswer": "b"
      },
      {
        "question": "A man buys 5 apples for $3 and sells 4 apples for $3. What is his profit percentage?",
        "answers": {
          "a": "20%",
          "b": "25%",
          "c": "30%"
        },
        "correctAnswer": "b"
      },
      {
        "question": "What is the next number in the series: 0, 1, 1, 2, 3, 5, 8, ?",
        "answers": {
          "a": "11",
          "b": "13",
          "c": "15"
        },
        "correctAnswer": "b"
      },
      {
        "question": "What is the area of a square with a side length of 9 cm?",
        "answers": {
          "a": "36 cm²",
          "b": "81 cm²",
          "c": "144 cm²"
        },
        "correctAnswer": "b"
      },
      {
        "question": "If 4x + 3 = 19, what is the value of x?",
        "answers": {
          "a": "4",
          "b": "5",
          "c": "6"
        },
        "correctAnswer": "a"
      },
      {
        "question": "What is the sum of the first 5 odd numbers?",
        "answers": {
          "a": "15",
          "b": "20",
          "c": "25"
        },
        "correctAnswer": "c"
      },
      {
        "question": "A car travels 240 km in 4 hours. What is its speed in m/s?",
        "answers": {
          "a": "16.67 m/s",
          "b": "20 m/s",
          "c": "25 m/s"
        },
        "correctAnswer": "a"
      },
      {
        "question": "What is the missing number in the series: 2, 5, 10, 17, 26, ?",
        "answers": {
          "a": "35",
          "b": "37",
          "c": "39"
        },
        "correctAnswer": "b"
      },
      {
        "question": "What is the value of (2³ × 3²)?",
        "answers": {
          "a": "36",
          "b": "48",
          "c": "72"
        },
        "correctAnswer": "c"
      },
      {
        "question": "A tank can be filled by Pipe A in 6 hours and by Pipe B in 4 hours. How long will it take if both pipes are opened together?",
        "answers": {
          "a": "2.4 hours",
          "b": "2.8 hours",
          "c": "3.2 hours"
        },
        "correctAnswer": "a"
      },
      {
        "question": "What is the median of the numbers 4, 7, 9, 12, 15?",
        "answers": {
          "a": "7",
          "b": "9",
          "c": "12"
        },
        "correctAnswer": "b"
      },
      {
        "question": "If 5 men can complete a task in 12 days, how many days will 6 men take?",
        "answers": {
          "a": "8",
          "b": "10",
          "c": "12"
        },
        "correctAnswer": "b"
      },
      {
        "question": "What is the next number in the series: 1, 3, 6, 10, 15, ?",
        "answers": {
          "a": "20",
          "b": "21",
          "c": "22"
        },
        "correctAnswer": "b"
      },
      {
        "question": "What is the value of 7² + 8²?",
        "answers": {
          "a": "100",
          "b": "113",
          "c": "125"
        },
        "correctAnswer": "b"
      },
      {
        "question": "A man walks 10 km north, then 6 km east. How far is he from the starting point?",
        "answers": {
          "a": "12 km",
          "b": "14 km",
          "c": "16 km"
        },
        "correctAnswer": "a"
      },
      {
        question:
          "A train running at 60 km/h crosses a pole in 9 seconds. What is the length of the train?",
        answers: {
          a: "120 meters",
          b: "150 meters",
          c: "180 meters",
        },
        correctAnswer: "b",
      },
      {
        question: "Find the next term in the series: 2, 6, 12, 20, 30, ?",
        answers: {
          a: "42",
          b: "40",
          c: "44",
        },
        correctAnswer: "a",
      },
      {
        question: "What is the smallest number divisible by both 12 and 18?",
        answers: {
          a: "36",
          b: "48",
          c: "72",
        },
        correctAnswer: "c",
      },
      {
        question:
          "A person travels a distance of 120 km in 3 hours. What is the speed of the person?",
        answers: {
          a: "30 km/h",
          b: "40 km/h",
          c: "50 km/h",
        },
        correctAnswer: "b",
      },
      {
        question:
          "If a clock shows 3:15, what is the angle between the hour hand and minute hand?",
        answers: {
          a: "22.5°",
          b: "30°",
          c: "45°",
        },
        correctAnswer: "a",
      },
      {
        question:
          "What is the perimeter of a rectangle with length 12 cm and width 5 cm?",
        answers: {
          a: "34 cm",
          b: "35 cm",
          c: "36 cm",
        },
        correctAnswer: "a",
      },
      {
        question:
          "Find the area of a triangle with base 10 cm and height 8 cm.",
        answers: {
          a: "40 cm²",
          b: "50 cm²",
          c: "60 cm²",
        },
        correctAnswer: "a",
      },
      {
        question:
          "If a car travels 150 km in 3 hours, what is its average speed?",
        answers: {
          a: "40 km/h",
          b: "50 km/h",
          c: "60 km/h",
        },
        correctAnswer: "b",
      },
      {
        question:
          "In how many years will $5000 become $6000 at an annual interest rate of 10%?",
        answers: {
          a: "5 years",
          b: "6 years",
          c: "7 years",
        },
        correctAnswer: "a",
      },
      {
        question:
          "The sum of two numbers is 60, and their difference is 10. What are the numbers?",
        answers: {
          a: "35 and 25",
          b: "40 and 20",
          c: "45 and 15",
        },
        correctAnswer: "a",
      },
      {
        question: "What is the next number in the sequence: 3, 5, 7, 11, 13, ?",
        answers: {
          a: "15",
          b: "17",
          c: "19",
        },
        correctAnswer: "b",
      },
      {
        question:
          "A car travels 120 km in 2 hours and 30 minutes. What is the average speed?",
        answers: {
          a: "45 km/h",
          b: "48 km/h",
          c: "50 km/h",
        },
        correctAnswer: "b",
      },
      {
        question: "Find the value of x in the equation: 3x + 5 = 20",
        answers: {
          a: "5",
          b: "4",
          c: "3",
        },
        correctAnswer: "b",
      },
      {
        question:
          "A man sells a product for $20, gaining a profit of 25%. What is the cost price?",
        answers: {
          a: "$15",
          b: "$16",
          c: "$17",
        },
        correctAnswer: "a",
      },
      {
        question: "What is the LCM of 8 and 12?",
        answers: {
          a: "48",
          b: "24",
          c: "36",
        },
        correctAnswer: "b",
      },
      {
        question:
          "Find the compound interest on $1000 for 2 years at 10% per annum, compounded annually.",
        answers: {
          a: "$200",
          b: "$210",
          c: "$220",
        },
        correctAnswer: "b",
      },
      {
        question: "What is the average of 4, 7, 10, 12?",
        answers: {
          a: "8.5",
          b: "9.5",
          c: "10",
        },
        correctAnswer: "a",
      },
      {
        question:
          "The cost of 3 pens and 2 pencils is $2.40. If the cost of a pen is $0.80, what is the cost of a pencil?",
        answers: {
          a: "$0.40",
          b: "$0.60",
          c: "$0.50",
        },
        correctAnswer: "a",
      },
      {
        question:
          "What is the area of a circle with a radius of 7 cm? (Use π = 22/7)",
        answers: {
          a: "154 cm²",
          b: "100 cm²",
          c: "49 cm²",
        },
        correctAnswer: "c",
      },
      {
        question: "What is the value of x in the equation: 5x - 7 = 18?",
        answers: {
          a: "5",
          b: "6",
          c: "7",
        },
        correctAnswer: "b",
      },
    ],

    Reasoning: [
      {
        "question": "If all Roses are Flowers and some Flowers fade quickly, which statement must be true?",
        "answers": {
          "a": "All Roses fade quickly",
          "b": "Some Roses fade quickly",
          "c": "No Roses fade quickly"
        },
        "correctAnswer": "b"
      },
      {
        "question": "Complete the analogy: Book is to Reading as Fork is to ___",
        "answers": {
          "a": "Eating",
          "b": "Cooking",
          "c": "Cutting"
        },
        "correctAnswer": "a"
      },
      {
        "question": "Which number comes next in the series: 2, 5, 10, 17, 26, ?",
        "answers": {
          "a": "35",
          "b": "37",
          "c": "39"
        },
        "correctAnswer": "b"
      },
      {
        "question": "If 'PENCIL' is coded as 'RGPENK', how is 'PAPER' coded?",
        "answers": {
          "a": "RCRGT",
          "b": "RCTGR",
          "c": "RCRTG"
        },
        "correctAnswer": "a"
      },
      {
        "question": "A is the brother of B. C is the mother of A. D is the sister of C. How is D related to B?",
        "answers": {
          "a": "Aunt",
          "b": "Mother",
          "c": "Grandmother"
        },
        "correctAnswer": "a"
      },
      {
        "question": "Which word does NOT belong: Apple, Banana, Carrot, Orange",
        "answers": {
          "a": "Apple",
          "b": "Banana",
          "c": "Carrot"
        },
        "correctAnswer": "c"
      },
      {
        "question": "If all Cats are Mammals and some Mammals are Pets, which is certain?",
        "answers": {
          "a": "All Pets are Cats",
          "b": "Some Cats are Pets",
          "c": "No Cats are Pets"
        },
        "correctAnswer": "b"
      },
      {
        "question": "Complete the series: A, C, F, J, ?",
        "answers": {
          "a": "K",
          "b": "O",
          "c": "M"
        },
        "correctAnswer": "b"
      },
      {
        "question": "If 'RED' is coded as '1854', how is 'BLUE' coded? (A=1, B=2,...)",
        "answers": {
          "a": "212215",
          "b": "221215",
          "c": "221225"
        },
        "correctAnswer": "b"
      },
      {
        "question": "Pointing to a woman, Raj said, 'Her daughter is my daughter’s sister.' How is Raj related to the woman?",
        "answers": {
          "a": "Husband",
          "b": "Brother",
          "c": "Father"
        },
        "correctAnswer": "a"
      },
      {
        "question": "Which is the odd one out: Square, Circle, Triangle, Cube",
        "answers": {
          "a": "Square",
          "b": "Circle",
          "c": "Cube"
        },
        "correctAnswer": "c"
      },
      {
        "question": "If 'MACHINE' is coded as '7413592', how is 'CAMERA' coded?",
        "answers": {
          "a": "714259",
          "b": "724159",
          "c": "714529"
        },
        "correctAnswer": "a"
      },
      {
        "question": "Arrange in order: 1. Sentence 2. Letter 3. Word 4. Alphabet",
        "answers": {
          "a": "4,2,3,1",
          "b": "4,3,2,1",
          "c": "2,4,3,1"
        },
        "correctAnswer": "a"
      },
      {
        "question": "If 'JANUARY' is written as 'FEBRUARY', how is 'MARCH' written?",
        "answers": {
          "a": "APRIL",
          "b": "MAY",
          "c": "JUNE"
        },
        "correctAnswer": "a"
      },
      {
        "question": "Which pair is different: Dog-Puppy, Cat-Kitten, Cow-Calf, Duck-Chick",
        "answers": {
          "a": "Dog-Puppy",
          "b": "Duck-Chick",
          "c": "Cow-Calf"
        },
        "correctAnswer": "b"
      },
      {
        "question": "If 'PALM' is to 'TREE', then 'FINGER' is to ___",
        "answers": {
          "a": "HAND",
          "b": "LEG",
          "c": "FOOT"
        },
        "correctAnswer": "a"
      },
      {
        "question": "Find the missing number: 3, 7, 15, 31, ?",
        "answers": {
          "a": "47",
          "b": "63",
          "c": "59"
        },
        "correctAnswer": "b"
      },
      {
        "question": "If 'CLOCK' is written as 'KCOLC', how is 'WATCH' written?",
        "answers": {
          "a": "HCTAW",
          "b": "HCTWA",
          "c": "HTCAW"
        },
        "correctAnswer": "c"
      },
      {
        "question": "Statements: All birds fly. A penguin is a bird. Conclusion: A penguin flies. The conclusion is:",
        "answers": {
          "a": "True",
          "b": "False",
          "c": "Uncertain"
        },
        "correctAnswer": "b"
      },
      {
        "question": "Complete the analogy: Doctor is to Hospital as Teacher is to ___",
        "answers": {
          "a": "School",
          "b": "Classroom",
          "c": "Student"
        },
        "correctAnswer": "a"
      },
      {
        "question": "Which is the next in the series: Z, X, V, T, ?",
        "answers": {
          "a": "S",
          "b": "R",
          "c": "Q"
        },
        "correctAnswer": "b"
      },
      {
        "question": "If 'MADRAS' is coded as '517914', how is 'BOMBAY' coded?",
        "answers": {
          "a": "215213",
          "b": "215211",
          "c": "215113"
        },
        "correctAnswer": "a"
      },
      {
        "question": "Pointing to a girl, Arun said, 'She is my wife’s brother’s daughter.' How is the girl related to Arun?",
        "answers": {
          "a": "Niece",
          "b": "Daughter",
          "c": "Sister"
        },
        "correctAnswer": "a"
      },
      {
        "question": "Which word does NOT belong: Mercury, Venus, Moon, Mars",
        "answers": {
          "a": "Mercury",
          "b": "Moon",
          "c": "Mars"
        },
        "correctAnswer": "b"
      },
      {
        "question": "If 'CAR' is to 'RAC', then 'BUS' is to ___",
        "answers": {
          "a": "SUB",
          "b": "USB",
          "c": "SBU"
        },
        "correctAnswer": "a"
      },
      {
        "question": "Find the missing number: 8, 16, 32, 64, ?",
        "answers": {
          "a": "96",
          "b": "128",
          "c": "124"
        },
        "correctAnswer": "b"
      },
      {
        "question": "If 'PAPER' is written as 'OZODQ', how is 'PENCIL' written?",
        "answers": {
          "a": "ODMBHK",
          "b": "ODMBHJ",
          "c": "ODMBJM"
        },
        "correctAnswer": "b"
      },
      {
        "question": "Statements: Some cats are black. All black animals are scary. Conclusion: Some cats are scary. The conclusion is:",
        "answers": {
          "a": "True",
          "b": "False",
          "c": "Uncertain"
        },
        "correctAnswer": "a"
      },
      {
        "question": "Complete the analogy: Pen is to Write as Knife is to ___",
        "answers": {
          "a": "Cut",
          "b": "Sharp",
          "c": "Metal"
        },
        "correctAnswer": "a"
      },
      {
        "question": "Which is the next in the series: 1, 4, 9, 16, 25, ?",
        "answers": {
          "a": "36",
          "b": "49",
          "c": "64"
        },
        "correctAnswer": "a"
      },
      {
        "question": "If 'DELHI' is coded as '73548', how is 'MUMBAI' coded?",
        "answers": {
          "a": "426917",
          "b": "426197",
          "c": "426719"
        },
        "correctAnswer": "b"
      },
      {
        "question": "A is B’s sister. C is B’s mother. D is C’s father. How is D related to A?",
        "answers": {
          "a": "Grandfather",
          "b": "Uncle",
          "c": "Father"
        },
        "correctAnswer": "a"
      },
      {
        "question": "Which word does NOT belong: Guitar, Violin, Flute, Drum",
        "answers": {
          "a": "Guitar",
          "b": "Drum",
          "c": "Flute"
        },
        "correctAnswer": "b"
      },
      {
        "question": "If 'MOUSE' is to 'COMPUTER', then 'WHEEL' is to ___",
        "answers": {
          "a": "CAR",
          "b": "BIKE",
          "c": "STEERING"
        },
        "correctAnswer": "a"
      },
      {
        "question": "Find the missing number: 5, 11, 23, 47, ?",
        "answers": {
          "a": "95",
          "b": "91",
          "c": "89"
        },
        "correctAnswer": "a"
      },
      {
        "question": "If 'TIGER' is written as 'QDFBO', how is 'LION' written?",
        "answers": {
          "a": "ILFK",
          "b": "ILFL",
          "c": "ILKL"
        },
        "correctAnswer": "b"
      },
      {
        "question": "Statements: All roses are flowers. Some flowers fade quickly. Conclusion: Some roses fade quickly. The conclusion is:",
        "answers": {
          "a": "True",
          "b": "False",
          "c": "Uncertain"
        },
        "correctAnswer": "c"
      },
      {
        "question": "Complete the analogy: Clock is to Time as Thermometer is to ___",
        "answers": {
          "a": "Heat",
          "b": "Temperature",
          "c": "Weather"
        },
        "correctAnswer": "b"
      },
      {
        "question": "Which is the next in the series: A, E, I, M, ?",
        "answers": {
          "a": "O",
          "b": "Q",
          "c": "S"
        },
        "correctAnswer": "b"
      },
      {
        "question": "If 'RAIN' is coded as '71914', how is 'SNOW' coded?",
        "answers": {
          "a": "19141523",
          "b": "19141522",
          "c": "19141524"
        },
        "correctAnswer": "a"
      },
      {
        "question": "Pointing to a man, Priya said, 'His brother’s father is my grandfather.' How is Priya related to the man?",
        "answers": {
          "a": "Sister",
          "b": "Daughter",
          "c": "Niece"
        },
        "correctAnswer": "a"
      },
      {
        question:
          "If all the apples are fruits and all fruits are sweet, then which of the following is true?",
        answers: {
          a: "All apples are sweet",
          b: "All fruits are apples",
          c: "Some apples are not sweet",
        },
        correctAnswer: "a",
      },
      {
        question: "Find the odd one out: 7, 13, 19, 21, 23",
        answers: {
          a: "7",
          b: "21",
          c: "19",
        },
        correctAnswer: "b",
      },
      {
        question:
          "If the day before yesterday was Thursday, what day will it be after tomorrow?",
        answers: {
          a: "Sunday",
          b: "Friday",
          c: "Saturday",
        },
        correctAnswer: "c",
      },
      {
        question: "Choose the missing number in the series: 1, 4, 9, 16, ?, 36",
        answers: {
          a: "20",
          b: "25",
          c: "30",
        },
        correctAnswer: "b",
      },
      {
        question: "If 2 pencils cost $1.50, what is the cost of 5 pencils?",
        answers: {
          a: "$3.50",
          b: "$3.75",
          c: "$4.00",
        },
        correctAnswer: "b",
      },
      {
        question:
          "Which of the following numbers is divisible by both 2 and 3?",
        answers: {
          a: "10",
          b: "15",
          c: "18",
        },
        correctAnswer: "c",
      },
      {
        question:
          "If a man is facing north, then after making three right turns, which direction will he face?",
        answers: {
          a: "South",
          b: "East",
          c: "West",
        },
        correctAnswer: "a",
      },
      {
        question: "Which number replaces the question mark: 2, 4, 8, 16, ?",
        answers: {
          a: "24",
          b: "30",
          c: "32",
        },
        correctAnswer: "c",
      },
      {
        question:
          "A clock shows 6:00. What is the angle between the hour hand and minute hand?",
        answers: {
          a: "180°",
          b: "90°",
          c: "45°",
        },
        correctAnswer: "a",
      },
      {
        question: "Which one of the following figures is the odd one out?",
        answers: {
          a: "Circle",
          b: "Square",
          c: "Triangle",
        },
        correctAnswer: "b",
      },
      {
        question:
          "If you rearrange the letters 'LOOSE' it will form the name of a:",
        answers: {
          a: "City",
          b: "Animal",
          c: "Country",
        },
        correctAnswer: "a",
      },
      {
        question:
          "If you rearrange the letters of the word 'SHINING', it will form the name of a:",
        answers: {
          a: "Animal",
          b: "Country",
          c: "City",
        },
        correctAnswer: "c",
      },
      {
        question:
          "If 6 workers can complete a job in 8 days, how many days will 12 workers take to complete the same job?",
        answers: {
          a: "2 days",
          b: "3 days",
          c: "4 days",
        },
        correctAnswer: "b",
      },
      {
        question:
          "If you see a clock showing 7:30, what is the angle between the hour and minute hand?",
        answers: {
          a: "15°",
          b: "75°",
          c: "90°",
        },
        correctAnswer: "b",
      },
      {
        question: "Find the missing term in the series: A, D, G, J, ?",
        answers: {
          a: "K",
          b: "M",
          c: "L",
        },
        correctAnswer: "c",
      },
      {
        question: "Which of the following is the smallest prime number?",
        answers: {
          a: "1",
          b: "2",
          c: "3",
        },
        correctAnswer: "b",
      },
      {
        question:
          "In a code language, if 'PLANT' is written as 'QMNUS', then how is 'MOUSE' written?",
        answers: {
          a: "NPTVF",
          b: "NPTWG",
          c: "NPUGF",
        },
        correctAnswer: "a",
      },
      {
        question:
          "If two pencils cost 40 cents, how much do five pencils cost?",
        answers: {
          a: "1 dollar",
          b: "2 dollars",
          c: "1.50 dollars",
        },
        correctAnswer: "a",
      },
      {
        question:
          "Which of the following is the next term in the series: 1, 4, 9, 16, 25, ?",
        answers: {
          a: "30",
          b: "36",
          c: "40",
        },
        correctAnswer: "b",
      },
      {
        question:
          "In a certain code, 'ABCD' is written as '1234'. How is 'EFGH' written in the same code?",
        answers: {
          a: "5678",
          b: "6789",
          c: "1234",
        },
        correctAnswer: "a",
      },
    ],
  };

  const shuffleQuestions = (section) => {
    const shuffled = [...sections[section]].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled.slice(0, 40)); // Limit to the first 10 questions after shuffle
  };

  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      submitQuiz();
    }
  }, [quizStarted, timeLeft]);

  const startQuiz = (section) => {
    shuffleQuestions(section);
    setCurrentSection(section);
    setShowModal(false);
    setQuizStarted(true);
    setTimeLeft(2400); // Reset timer
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  };

  const submitQuiz = () => {
    setQuizStarted(false);
    let numCorrect = 0;

    shuffledQuestions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        numCorrect++;
      }
    });

    setResults(`You scored ${numCorrect} out of ${shuffledQuestions.length}!`);
    setTimeLeft(600); // Reset timer
  };

  return (
    <div className="mainDiv">
      {showModal && (
        <div
          className="modal"
          style={{
            backgroundColor: "#e3f2fd",
            color: "#0d47a1",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>Select a Section to Begin</h2>
          <h3>Solve 40 question in 40 min</h3>
          {Object.keys(sections).map((section) => (
            <div
              key={section}
              style={{
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #0d47a1",
                borderRadius: "10px",
              }}
            >
              <h3>{section}</h3>
              <button
                onClick={() => startQuiz(section)}
                style={{
                  backgroundColor: "#0d47a1",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Start
              </button>
            </div>
          ))}
        </div>
      )}

      {quizStarted && (
        <div
          className="quizdiv"
          style={{
            backgroundColor: "#e3f2fd",
            color: "#0d47a1",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <div className="timer" style={{ marginBottom: "20px" }}>
            <h3>
              Time Left: {Math.floor(timeLeft / 60)}:
              {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
            </h3>
          </div>

          <div id="quiz">
            {shuffledQuestions.map((q, index) => (
              <div
                key={index}
                className="question-container"
                style={{ marginBottom: "20px" }}
              >
                <h4>{q.question}</h4>
                {Object.entries(q.answers).map(([key, value]) => (
                  <label
                    key={key}
                    style={{ display: "block", margin: "5px 0" }}
                  >
                    <input
                      type="radio"
                      name={`question${index}`}
                      value={key}
                      onChange={() => handleAnswerChange(index, key)}
                      style={{ width: "auto" }}
                    />
                    {key}: {value}
                  </label>
                ))}
              </div>
            ))}

            <button
              id="submit"
              onClick={submitQuiz}
              style={{
                backgroundColor: "#0d47a1",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {results && (
        <div
          id="results"
          style={{
            backgroundColor: "#e3f2fd",
            color: "#0d47a1",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3>{results}</h3>
          <Link to={"/"} class="button">
            <svg
              class="svgIcon"
              viewBox="0 0 512 512"
              height="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
            </svg>
            Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default Test;

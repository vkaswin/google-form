export const templates: Record<string, any> = {
  contactInformation: {
    title: "Contact Information",
    bgCode: "#e4f3e5",
    colorCode: "#4caf50",
    sections: [
      {
        title: "Contact information",
        fields: [
          {
            title: "Name",
            fieldType: "input",
            rules: {
              required: { value: true, message: "Please enter name" },
            },
          },
          {
            title: "Email",
            fieldType: "input",
            rules: {
              required: { value: true, message: "Please enter email" },
              pattern: {
                value: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
                message: "Invalid Email",
              },
            },
          },
          {
            title: "Address",
            fieldType: "textarea",
            rules: {
              required: { value: true, message: "Please enter address" },
            },
          },
          {
            title: "Phone Number",
            fieldType: "input",
            rules: {
              required: { value: true, message: "Please enter phone number" },
              pattern: {
                value: "^[0-9]{10}$",
                message: "Invalid phone number",
              },
            },
          },
          {
            title: "Comments",
            fieldType: "input",
            rules: {},
          },
        ],
      },
    ],
  },
  eventRegistration: {
    bgCode: "#d9efed",
    colorCode: "#009688",
    title: "Event Registration",
    sections: [
      {
        title: "Event registration",
        description:
          'Event Timing: January 4th-6th, 2016<br>Event Address: 123 Your Street Your City, ST 12345<br>Contact us at (123) 456-7890 or <a href="mailto:no_reply@example.com">no_reply@example.com</a>',
        fields: [
          {
            title: "Name",
            fieldType: "input",
            rules: {
              required: { value: true, message: "Please enter name" },
            },
          },
          {
            title: "Email",
            fieldType: "input",
            rules: {
              required: { value: true, message: "Please enter email" },
              pattern: {
                value: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
                message: "Invalid Email",
              },
            },
          },
          {
            title: "Phone Number",
            fieldType: "input",
            rules: {
              required: { value: true, message: "Please enter phone number" },
              pattern: {
                value: "^[0-9]{10}$",
                message: "Invalid phone number",
              },
            },
          },
          {
            title: "Organisation",
            fieldType: "input",
            rules: {
              required: { value: true, message: "Please enter organisation" },
            },
          },
          {
            title: "What days will you attend?",
            fieldType: "checkbox",
            options: ["Day 1", "Day 2", "Day 3"],
            rules: {
              required: {
                value: true,
                message: "Please select any one option",
              },
            },
          },
          {
            title: "Dietary restrictions",
            options: ["None", "Vegetarian", "Vegan", "Kosher", "Gluten-free"],
            other: true,
            fieldType: "radio",
            rules: {
              required: {
                value: true,
                message: "This field is required",
              },
            },
          },
          {
            title: "I understand that I will have to pay $$ upon arrival*",
            fieldType: "checkbox",
            options: ["Yes"],
            rules: {
              required: {
                value: true,
                message: "Please agree to submit the form",
              },
            },
          },
        ],
      },
    ],
  },
  jobApplication: {
    title: "Job Application",
    bgCode: "#f0ebf8",
    colorCode: "#673ab7",
    sections: [
      {
        title: "Job Application",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis sem odio. Sed commodo vestibulum leo, sit amet tempus odio consectetur in. Mauris dolor elit, dignissim mollis feugiat maximus, faucibus et eros.",
        fields: [
          {
            title: "Name",
            fieldType: "input",
            rules: {
              required: { value: true, message: "Please enter name" },
            },
          },
          {
            title: "Email",
            fieldType: "input",
            rules: {
              required: { value: true, message: "Please enter email" },
              pattern: {
                value: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
                message: "Invalid Email",
              },
            },
          },
          {
            title: "Address",
            fieldType: "textarea",
            rules: {
              required: { value: true, message: "Please enter address" },
            },
          },
          {
            title: "Phone Number",
            fieldType: "input",
            rules: {
              required: { value: true, message: "Please enter phone number" },
              pattern: {
                value: "^[0-9]{10}$",
                message: "Invalid phone number",
              },
            },
          },
          {
            title: "Which position(s) are you interested in?",
            fieldType: "checkbox",
            options: ["Position 1", "Position 2", "Position 3"],
            rules: {
              required: {
                value: true,
                message: "Please select any one position",
              },
            },
          },
          {
            title: "Submit your cover letter or resume",
            fieldType: "textarea",
            rules: {},
          },
        ],
      },
    ],
  },
  orderForm: {
    title: "Order Form",
    bgCode: "#eceef8",
    colorCode: "#3f51b5",
    sections: [
      {
        title: "Order Form",
        description:
          'After you fill out this order request, we will contact you to go over details and availability before the order is completed. If you would like faster service and direct information on current stock and pricing please contact us at Contact us at (123) 456-7890 or <a href="mailto:no_reply@example.com">no_reply@example.com</a>',
        fields: [
          {
            title: "Name",
            fieldType: "input",
            rules: {
              required: { value: true, message: "Please enter name" },
            },
          },
          {
            title: "Email",
            fieldType: "input",
            rules: {
              required: { value: true, message: "Please enter email" },
              pattern: {
                value: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
                message: "Invalid Email",
              },
            },
          },
          {
            title: "Address",
            fieldType: "textarea",
            rules: {
              required: { value: true, message: "Please enter address" },
            },
          },
          {
            title: "Phone Number",
            fieldType: "input",
            rules: {
              required: { value: true, message: "Please enter phone number" },
              pattern: {
                value: "^[0-9]{10}$",
                message: "Invalid phone number",
              },
            },
          },
          {
            title: "Are you a new or existing customer?",
            options: ["I am a new customer", "I am an existing customer"],
            fieldType: "radio",
            rules: {
              required: { value: true, message: "This field is required" },
            },
          },
          {
            title: "What is the item you would like to order?",
            description: "Please enter the product number",
            fieldType: "input",
            rules: {
              required: { value: true, message: "This field is required" },
            },
          },
          {
            title: "What color(s) would you like to order?",
            options: ["Color 1", "Color 2", "Color 3", "Color 4"],
            fieldType: "checkbox",
            rules: {
              required: { value: true, message: "Please select any one color" },
            },
          },
          {
            title: "Preferred contact method",
            options: ["Phone", "Email"],
            fieldType: "radio",
            rules: {
              required: { value: true, message: "This field is required" },
            },
          },
          {
            title: "Questions and Comments",
            fieldType: "input",
            rules: {},
          },
        ],
      },
    ],
  },
  customerFeedBack: {
    title: "Customer Feedback",
    bgCode: "#e7ecee",
    colorCode: "#607d8b",
    sections: [
      {
        title: "Customer Feedback",
        description:
          "We would love to hear your thoughts or feedback on how we can improve your experience!",
        fields: [
          {
            title: "Name",
            fieldType: "input",
            rules: {
              required: { value: true, message: "Please enter name" },
            },
          },
          {
            title: "Email",
            fieldType: "input",
            rules: {
              required: { value: true, message: "Please enter email" },
              pattern: {
                value: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
                message: "Invalid Email",
              },
            },
          },
          {
            title: "Phone Number",
            fieldType: "input",
            rules: {
              required: { value: true, message: "Please enter phone number" },
              pattern: {
                value: "^[0-9]{10}$",
                message: "Invalid phone number",
              },
            },
          },
          {
            title: "Feedback Type",
            options: [
              "Comments",
              "Questions",
              "Bug Reports",
              "Feature Request",
            ],
            fieldType: "radio",
            rules: {
              required: { value: true, message: "This field is required" },
            },
          },
          {
            title: "Feedback",
            fieldType: "textarea",
            rules: {
              required: { value: true, message: "Please enter feedback" },
            },
          },
          {
            title: "Suggestions for improvement",
            fieldType: "textarea",
            rules: {},
          },
        ],
      },
    ],
  },
  partyInvite: {
    title: "Party Invite",
    bgCode: "#e3edfd",
    colorCode: "#4285f4",
    sections: [
      {
        title: "Party Invite",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis sem odio. Sed commodo vestibulum leo, sit amet tempus odio consectetur in.",
        fields: [
          {
            title: "What is you name?",
            fieldType: "input",
            rules: {
              required: { value: true, message: "Please enter name" },
            },
          },
          {
            title: "Can you attend?",
            fieldType: "radio",
            options: ["Yes,  I'll be there", "Sorry, can't make it"],
            rules: {
              required: { value: true, message: "This field is required" },
            },
          },
          {
            title: "How many of you are attending?",
            fieldType: "input",
            rules: {},
          },
          {
            title: "What will you be bringing?",
            description: "Let us know what kind of dish(es) you'll be bringing",
            options: [
              "Mains",
              "Salad",
              "Dessert",
              "Drinks",
              "Sides/Appetizers",
            ],
            fieldType: "checkbox",
            rules: {},
          },
          {
            title: "Do you have any allergies or dietary restrictions?",
            fieldType: "input",
            rules: {},
          },
          {
            title: "What is your email address?",
            fieldType: "input",
            rules: {
              required: { value: true, message: "Please enter email" },
              pattern: {
                value: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
                message: "Invalid Email",
              },
            },
          },
        ],
      },
    ],
  },
  courseEvaluation: {
    title: "Course Evaluation",
    bgCode: "#fae3e1",
    colorCode: "#db4437",
    sections: [
      {
        title: "Course Evaluation",
        description:
          "Please submit feedback regarding the course you have just completed, including feedback on course structure, content, and instructor.",
        fields: [
          {
            title: "Class name",
            fieldType: "input",
            rules: {
              required: { value: true, message: "Please enter name" },
            },
          },
          {
            title: "Instructor",
            fieldType: "input",
            rules: {
              required: { value: true, message: "Please enter instructor" },
            },
          },
          {
            title: "What aspects of this course were most useful or valuable?",
            fieldType: "textarea",
            rules: {},
          },
          {
            title: "How would you improve this course?",
            fieldType: "textarea",
            rules: {},
          },
          {
            title: "Why did you choose this course?",
            options: ["Degree requirement", "Time offered", "Interest"],
            fieldType: "radio",
            rules: {
              required: { value: true, message: "This field is required" },
            },
          },
          {
            title: "Rate the course form 1 to 5",
            fieldType: "rating",
            rules: {
              required: { value: true, message: "This field is required" },
            },
          },
        ],
      },
    ],
  },
  starterTemplate: {
    isDefault: true,
    title: "Google Form",
    bgCode: "#f0ebf8",
    colorCode: "#673ab7",
    sections: [
      {
        title: "Untitled form",
        fields: [
          {
            title: "Untitled Question",
            fieldType: "radio",
            options: ["Option 1", "Option 2", "Option 3"],
            rules: {},
          },
        ],
      },
    ],
  },
};

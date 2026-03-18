import { Mission } from '@/types/game';

export const missions: Mission[] = [
  {
    id: 'password',
    title: 'Password Fortress',
    description: 'Build an unbreakable password to protect your digital kingdom',
    icon: '🔐',
    xpReward: 100,
    badge: {
      name: 'Password Guardian',
      icon: '🛡️',
    },
    intro: 'Welcome, Cyber Guardian! Your first mission is to create a fortress-strong password. A strong password is your first line of defense against hackers. Let\'s build one together!',
    challenge: {
      type: 'quiz',
      questions: [
        {
          question: 'Which password is the strongest?',
          options: [
            'password123',
            'P@ssw0rd!2024',
            'MyDog2023',
            'Tr!cky$ecur3P@ss#2024'
          ],
          correctAnswer: 3,
          explanation: 'Strong passwords combine uppercase, lowercase, numbers, and special characters with at least 12 characters. They should be unpredictable and unique.',
          correctExplanation: 'Perfect! This password uses a mix of uppercase, lowercase, numbers, and special characters, making it very hard to crack.',
          optionExplanations: [
            '✗ Not quite! This is extremely weak — it\'s a common word followed by numbers. Hackers can crack this in seconds using dictionary attacks.',
            '✗ Not quite! While it has special characters and numbers, it\'s still based on a common word pattern that hackers easily recognize and test.',
            '✗ Not quite! Personal references like pet names are easy to guess. Hackers often check social media for clues like this.',
            '✓ Correct! This password uses a mix of uppercase, lowercase, numbers, and special characters, making it very hard to crack.'
          ],
        },
        {
          question: 'What makes a password weak?',
          options: [
            'Using your birthday or name',
            'Making it long and random',
            'Using a password manager',
            'Changing it regularly'
          ],
          correctAnswer: 0,
          explanation: 'Personal information like birthdays, names, or common words are easy for hackers to guess. Always avoid them!',
          correctExplanation: 'Exactly! Personal info is the first thing hackers try. Keep passwords random and unrelated to your life.',
          optionExplanations: [
            '✓ Correct! Using personal details like birthdays or names makes your password easy to guess because hackers often use public info or social media clues to crack passwords.',
            '✗ Not quite! Long and random passwords are actually very strong — they increase the number of possible combinations, making them harder to crack.',
            '✗ Not quite! Password managers actually help you generate and store strong, unique passwords — they don\'t make passwords weak.',
            '✗ Not quite! Changing passwords regularly can improve security, but it doesn\'t make a weak password strong. Strength depends on complexity and unpredictability.'
          ],
        },
        {
          question: 'How often should you reuse passwords?',
          options: [
            'Use the same one for everything',
            'Reuse for important accounts only',
            'Never reuse passwords',
            'Reuse with slight changes'
          ],
          correctAnswer: 2,
          explanation: 'Reusing passwords is dangerous! If one account gets hacked, all accounts with that password are at risk.',
          correctExplanation: 'Spot on! Every account should have a unique password. Use a password manager to keep track!',
          optionExplanations: [
            '✗ Not quite! This is extremely risky — if one website gets breached, hackers can access all your accounts with that password.',
            '✗ Not quite! Even important accounts need unique passwords. A data breach on one site can compromise all accounts using that password.',
            '✓ Correct! Every account should have a unique password. If one gets hacked, your other accounts stay safe. Use a password manager to keep track!',
            '✗ Not quite! Slight changes like "Password1" and "Password2" are still predictable. Each account needs a completely unique password.'
          ],
        },
      ],
    },
  },
  {
    id: 'phishing',
    title: 'Phishing Trap',
    description: 'Spot the fake emails trying to steal your information',
    icon: '🎣',
    xpReward: 150,
    badge: {
      name: 'Email Detective',
      icon: '🔍',
    },
    intro: 'Phishing emails are disguised as legitimate messages to trick you into revealing sensitive information. Can you spot the fake?',
    challenge: {
      type: 'quiz',
      questions: [
        {
          question: 'Which email is a phishing attempt?',
          options: [
            'Your bank asking you to click a link to "verify your account urgently"',
            'A receipt from Amazon for your recent order',
            'A calendar invite from your professor',
            'A newsletter you subscribed to'
          ],
          correctAnswer: 0,
          explanation: 'Phishing emails create urgency and ask you to click suspicious links. Banks never ask for verification via email!',
          correctExplanation: 'Correct! Urgent requests with links are classic phishing tactics. Always verify directly with the company.',
          optionExplanations: [
            '✓ Correct! Phishing emails create fake urgency and ask you to click suspicious links. Banks never ask for verification via email — always contact them directly!',
            '✗ Not quite! Legitimate receipts from recent orders you made are usually safe, especially if you just placed an order. But always check the sender address!',
            '✗ Not quite! Calendar invites from known contacts like professors are typically legitimate, especially if you\'re expecting them.',
            '✗ Not quite! Newsletters you knowingly subscribed to are generally safe. However, always be cautious of unexpected emails even from familiar senders.'
          ],
        },
        {
          question: 'What\'s a red flag in an email?',
          options: [
            'Proper grammar and spelling',
            'Sender address looks slightly off',
            'Expected attachment you requested',
            'Personalized greeting with your name'
          ],
          correctAnswer: 1,
          explanation: 'Check the sender\'s email carefully! Phishers often use addresses that look similar but have subtle differences.',
          correctExplanation: 'Excellent eye! Small changes in email addresses (like "paypa1.com" instead of "paypal.com") are huge red flags.',
          optionExplanations: [
            '✗ Not quite! Proper grammar and spelling actually indicate a legitimate email. Phishing emails often have mistakes and typos.',
            '✓ Correct! Always check the sender\'s email address carefully. Phishers use addresses that look similar but have subtle differences like "paypa1.com" instead of "paypal.com".',
            '✗ Not quite! Attachments you specifically requested from trusted sources are usually fine. It\'s the unexpected ones that are dangerous.',
            '✗ Not quite! Personalized greetings can appear in both legitimate and phishing emails. Scammers can find your name from data breaches or social media.'
          ],
        },
        {
          question: 'You receive an unexpected prize notification. What do you do?',
          options: [
            'Click the link to claim immediately',
            'Reply with your personal information',
            'Delete it - you didn\'t enter any contest',
            'Forward it to friends'
          ],
          correctAnswer: 2,
          explanation: 'If you didn\'t enter a contest, you didn\'t win! These are scams designed to steal your data or money.',
          correctExplanation: 'Smart thinking! Unsolicited prize emails are almost always scams. Trust your instincts!',
          optionExplanations: [
            '✗ Not quite! Clicking unknown links can install malware or take you to fake websites designed to steal your information. Never click!',
            '✗ Not quite! Replying with personal info hands it directly to scammers. They\'ll use it for identity theft or sell it on the dark web.',
            '✓ Correct! If you didn\'t enter a contest, you didn\'t win. These are scams designed to steal your data or money. Trust your instincts and delete!',
            '✗ Not quite! Forwarding scams spreads them to more victims. Instead, delete the email and warn your friends about these types of scams.'
          ],
        },
      ],
    },
  },
  {
    id: 'mfa',
    title: 'MFA Tower',
    description: 'Add an extra layer of security with Two-Factor Authentication',
    icon: '🏰',
    xpReward: 120,
    badge: {
      name: 'Security Architect',
      icon: '🏗️',
    },
    intro: 'Multi-Factor Authentication (MFA) adds a second verification step, making it much harder for attackers to access your accounts even if they have your password.',
    challenge: {
      type: 'quiz',
      questions: [
        {
          question: 'What is the best second factor for authentication?',
          options: [
            'Your date of birth',
            'Your email address',
            'An authenticator app code',
            'Your pet\'s name'
          ],
          correctAnswer: 2,
          explanation: 'Authenticator apps generate time-based codes that change every 30 seconds, making them extremely secure!',
          correctExplanation: 'Perfect! Apps like Google Authenticator or Authy are the gold standard for MFA security.',
          optionExplanations: [
            '✗ Not quite! Your date of birth is static information that can be found through public records or social media. It\'s not a secure second factor.',
            '✗ Not quite! Email can work but if your email gets hacked, both your password and second factor are compromised. Use something independent!',
            '✓ Correct! Authenticator apps like Google Authenticator or Authy generate time-based codes that change every 30 seconds — the gold standard for MFA security.',
            '✗ Not quite! Personal details like pet names can be discovered through social media. Second factors should be dynamic, not static information.'
          ],
        },
        {
          question: 'Why is SMS-based MFA less secure?',
          options: [
            'It\'s too convenient',
            'Phone numbers can be hijacked',
            'It costs money',
            'It\'s not less secure'
          ],
          correctAnswer: 1,
          explanation: 'Hackers can steal your phone number through "SIM swapping," intercepting your SMS codes. Use app-based MFA instead!',
          correctExplanation: 'Exactly! SIM swapping is a real threat. Authenticator apps are much safer than SMS codes.',
          optionExplanations: [
            '✗ Not quite! Convenience isn\'t the security issue. SMS-based MFA is better than nothing, but there are more secure alternatives available.',
            '✓ Correct! Hackers can steal your phone number through "SIM swapping" attacks, intercepting your SMS codes. Authenticator apps are much safer!',
            '✗ Not quite! Cost isn\'t the security concern. Most SMS codes are free, but even if they weren\'t, the real issue is vulnerability to hijacking.',
            '✗ Not quite! SMS-based MFA is less secure due to SIM swapping attacks. While it\'s better than no MFA, app-based authentication is safer.'
          ],
        },
        {
          question: 'What happens if someone gets your password but you have MFA enabled?',
          options: [
            'They can still access your account',
            'They\'re blocked without the second factor',
            'Your account gets deleted',
            'Nothing changes'
          ],
          correctAnswer: 1,
          explanation: 'Even with your password, hackers can\'t access your account without the second factor. That\'s why MFA is so powerful!',
          correctExplanation: 'Correct! MFA is your safety net. Even if passwords leak, your account stays protected.',
          optionExplanations: [
            '✗ Not quite! That\'s the whole point of MFA — even with your password, hackers can\'t get in without the second factor. It\'s your safety net!',
            '✓ Correct! Even with your password, hackers can\'t access your account without the second factor. That\'s why MFA is so powerful and essential!',
            '✗ Not quite! Your account stays active and safe. MFA just blocks unauthorized access — it doesn\'t delete anything.',
            '✗ Not quite! MFA makes a huge difference! Without the second factor, hackers are blocked even if they have your password.'
          ],
        },
      ],
    },
  },
  {
    id: 'privacy',
    title: 'Privacy Patrol',
    description: 'Learn what NOT to share on social media',
    icon: '👁️',
    xpReward: 130,
    badge: {
      name: 'Privacy Champion',
      icon: '🥇',
    },
    intro: 'Oversharing on social media can expose you to identity theft, stalking, and scams. Let\'s learn what to keep private!',
    challenge: {
      type: 'quiz',
      questions: [
        {
          question: 'Which should you NEVER post publicly on social media?',
          options: [
            'Your vacation photos after you return',
            'Your full address and phone number',
            'Your hobby interests',
            'Motivational quotes'
          ],
          correctAnswer: 1,
          explanation: 'Posting your address or phone number publicly invites stalkers, scammers, and identity thieves. Keep it private!',
          correctExplanation: 'Absolutely right! This information can be used for identity theft, stalking, or targeted scams.',
          optionExplanations: [
            '✗ Not quite! Posting vacation photos AFTER you return is actually safe because criminals already know you\'re back home. It\'s posting during travel that\'s risky.',
            '✓ Correct! Posting your address or phone number publicly invites stalkers, scammers, and identity thieves. This info can be used for targeted attacks — keep it private!',
            '✗ Not quite! Sharing hobby interests is generally safe and helps you connect with like-minded people. Just avoid oversharing personal details!',
            '✗ Not quite! Motivational quotes are harmless to share. The danger comes from sharing personal identifying information that can be exploited.'
          ],
        },
        {
          question: 'When should you post about being on vacation?',
          options: [
            'Before you leave',
            'While you\'re away',
            'After you return home',
            'Never mention vacations'
          ],
          correctAnswer: 2,
          explanation: 'Posting during a trip tells criminals your home is empty! Wait until you\'re back to share your adventures.',
          correctExplanation: 'Smart! Sharing travel plans in real-time is like hanging a "rob me" sign on your door. Post after you return.',
          optionExplanations: [
            '✗ Not quite! Posting before leaving tells burglars exactly when your home will be empty. It\'s like giving them your schedule!',
            '✗ Not quite! Posting in real-time broadcasts that your home is unprotected right now — a perfect opportunity for criminals.',
            '✓ Correct! Wait until you\'re back to share your adventures. Posting during a trip is like hanging a "rob me" sign on your door!',
            '✗ Not quite! You can share vacation memories safely — just wait until after you return home. Complete secrecy isn\'t necessary, timing is key.'
          ],
        },
        {
          question: 'What privacy setting is safest for personal posts?',
          options: [
            'Public - everyone can see',
            'Friends only',
            'Friends of friends',
            'Custom - only close friends'
          ],
          correctAnswer: 3,
          explanation: 'The more restricted, the safer! Custom settings let you choose exactly who sees sensitive content.',
          correctExplanation: 'Perfect! Controlling who sees what gives you maximum privacy and security on social media.',
          optionExplanations: [
            '✗ Not quite! Public posts can be seen by anyone — including scammers, stalkers, and identity thieves. Always limit who sees personal content.',
            '✗ Not quite! "Friends only" is better than public, but remember: you might have hundreds of "friends" including acquaintances. More restriction is safer.',
            '✗ Not quite! Friends of friends can mean thousands of strangers see your posts. You don\'t know or trust most of these people!',
            '✓ Correct! Custom settings let you choose exactly who sees sensitive content. The more restricted, the safer — maximum privacy and security!'
          ],
        },
      ],
    },
  },
  {
    id: 'malware',
    title: 'Device Defender',
    description: 'Identify and remove malware threats from infected devices',
    icon: '🦠',
    xpReward: 140,
    badge: {
      name: 'Malware Hunter',
      icon: '⚔️',
    },
    intro: 'Malware can infect your devices through suspicious downloads, pop-ups, and links. Can you identify the threats?',
    challenge: {
      type: 'quiz',
      questions: [
        {
          question: 'What should you do if you see a pop-up saying "Your computer is infected! Click here to fix it"?',
          options: [
            'Click the button immediately',
            'Download the recommended software',
            'Close the pop-up and run your antivirus',
            'Share it with friends'
          ],
          correctAnswer: 2,
          explanation: 'These pop-ups ARE the malware! Never click them. Close the window and run a trusted antivirus scan.',
          correctExplanation: 'Excellent instinct! Fake virus warnings are common malware traps. Always use trusted security software.',
          optionExplanations: [
            '✗ Not quite! Clicking is exactly what scammers want. The pop-up itself is the threat — clicking will install real malware!',
            '✗ Not quite! The "recommended software" IS the malware. These fake alerts trick you into downloading viruses disguised as security tools.',
            '✓ Correct! These pop-ups ARE the malware. Close the window immediately and run a trusted antivirus scan. Never click fake warnings!',
            '✗ Not quite! Don\'t spread malware warnings. Instead, close it, scan your system with trusted antivirus, and warn friends about these scam tactics.'
          ],
        },
        {
          question: 'Which download source is safest?',
          options: [
            'Random websites from Google search',
            'Torrent sites',
            'Official app stores or developer websites',
            'Email attachments from strangers'
          ],
          correctAnswer: 2,
          explanation: 'Always download from official sources! Third-party sites often bundle malware with legitimate software.',
          correctExplanation: 'Perfect! Official stores verify apps for safety. Avoid sketchy download sites at all costs.',
          optionExplanations: [
            '✗ Not quite! Random websites often bundle malware with downloads. Just because it appears in search results doesn\'t mean it\'s safe!',
            '✗ Not quite! Torrent sites are notorious for hiding viruses in files. Even legitimate software from torrents often contains malware.',
            '✓ Correct! Official app stores and developer websites verify software for safety. Always download from trusted, official sources!',
            '✗ Not quite! Email attachments from strangers are extremely dangerous — they\'re a primary way malware spreads. Never open them!'
          ],
        },
        {
          question: 'Your friend sends you a file with a .exe extension. What do you do?',
          options: [
            'Open it immediately - it\'s from a friend',
            'Ask them if they actually sent it first',
            'Run it in a virtual machine',
            'Delete it without checking'
          ],
          correctAnswer: 1,
          explanation: 'Hackers often compromise accounts to spread malware. Always verify unexpected files, even from trusted contacts!',
          correctExplanation: 'Smart move! Accounts get hacked all the time. A quick message can save you from malware infections.',
          optionExplanations: [
            '✗ Not quite! Even friends\' accounts get hacked and used to spread malware. Unexpected .exe files should always be verified first!',
            '✓ Correct! Hackers often compromise accounts to spread malware. A quick message to verify can save you from infection — always confirm unexpected files!',
            '✗ Not quite! While virtual machines offer protection, most people don\'t have them. The simpler, safer approach is to verify with your friend first.',
            '✗ Not quite! Don\'t delete without checking — your friend might have genuinely sent something. A quick verification message is the smart move.'
          ],
        },
      ],
    },
  },
];

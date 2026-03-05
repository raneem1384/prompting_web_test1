import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle2, Lightbulb, Star, Zap } from 'lucide-react';
import './Lesson.css';

const courseData = {
    1: {
        title: 'Prompt Basics',
        lessons: [
            {
                title: 'What is a Prompt?',
                content: `A **prompt** is any text you send to an AI model to get a response. It's your way of communicating with the AI — telling it what you want, how you want it, and why you need it.\n\nThink of it like giving instructions to a very capable but literal assistant. The clearer and more structured your instructions, the better the result.`,
                tip: 'A prompt is not just a question. It can include instructions, examples, roles, and formatting rules.',
                quiz: {
                    q: 'What is the main purpose of a prompt?',
                    options: ['To confuse the AI', 'To communicate your request clearly to the AI', 'To generate random text', 'To set up a database'],
                    answer: 1,
                },
            },
            {
                title: 'How AI Reads Your Input',
                content: `AI language models process prompts as **sequences of tokens** (roughly, word-pieces). The model looks at all the text you provide and predicts the most likely useful response.\n\nIt does NOT have memory between conversations. It doesn't "think" — it generates the statistically most probable continuation of your text.\n\nThis means: **your words shape the output**. Vague input → vague output. Clear, structured input → precise, useful output.`,
                tip: 'The AI only knows what you tell it. Give it all the context it needs to answer well.',
                quiz: {
                    q: 'Why does clear input lead to better AI output?',
                    options: ['AI randomly picks answers', 'AI generates the most probable response based on what you write', 'AI reads your mind', 'AI searches the internet'],
                    answer: 1,
                },
            },
            {
                title: 'Common Prompting Mistakes',
                content: `Here are the most common beginner mistakes when writing prompts:\n\n**1. Too vague** — "Tell me about marketing" gives you a wall of generic text.\n\n**2. No role or context** — Without knowing who it's talking to or why, the AI defaults to a generic tone.\n\n**3. No format specified** — If you want bullet points, say so! Otherwise you'll get paragraphs.\n\n**4. Asking multiple questions at once** — This often causes the AI to skip some questions.\n\n**5. Not iterating** — The first prompt is rarely the best. Refine based on the output.`,
                tip: 'Treat your first prompt as a draft. Always be ready to refine.',
                quiz: {
                    q: 'Which is an example of a vague prompt?',
                    options: ['Write a haiku about autumn in 5-7-5 format', 'Explain things', 'You are a chef. Give me a 3-ingredient pasta recipe for beginners.', 'Summarize this article in 3 bullet points'],
                    answer: 1,
                },
            },
            {
                title: 'Your First Great Prompt',
                content: `Let's build your first excellent prompt using a simple template:\n\n**[Role] + [Task] + [Context] + [Format]**\n\nExample:\n\n> *You are a nutrition coach.*\n> *Create a 7-day meal plan for a beginner trying to reduce sugar intake.*\n> *The person has no cooking experience and has 30 minutes per meal.*\n> *Format it as a table with Day, Meal, and Prep Time columns.*\n\nThis prompt gives the AI everything it needs: who it is, what to do, who the audience is, and how to present the result.`,
                tip: 'Use the Prompt Builder tool to visually construct prompts like this one!',
                quiz: {
                    q: 'Which of these is the most complete prompt?',
                    options: [
                        'Tell me about diets',
                        'You are a nutritionist. Create a 5-day low-carb plan for a student with a small budget. Use bullet points.',
                        'Give a meal plan',
                        'I want food advice',
                    ],
                    answer: 1,
                },
            },
        ],
    },
    2: {
        title: 'Prompt Structure',
        lessons: [
            {
                title: 'The Role Component',
                content: `The **Role** component tells the AI who it should behave as. This fundamentally shapes the tone, vocabulary, and expertise level of the response.\n\n**Examples:**\n- "You are an expert Python developer…"\n- "You are a friendly high school biology teacher…"\n- "You are a professional copywriter specializing in tech startups…"\n\nAssigning a role helps the AI adopt the right perspective, vocabulary, and level of detail for your specific need.`,
                tip: 'The more specific your role, the more tailored the response. "Senior data analyst at a fintech company" is better than just "analyst".',
                quiz: {
                    q: 'What does the Role component in a prompt do?',
                    options: ['It adds formatting', 'It tells the AI what persona or expertise to adopt', 'It limits response length', 'It provides examples'],
                    answer: 1,
                },
            },
            {
                title: 'The Task Component',
                content: `The **Task** is the core action you want the AI to perform. Make it **specific, actionable, and unambiguous**.\n\n**Weak:** "Tell me about marketing"\n**Strong:** "Write a 200-word email to re-engage customers who haven't purchased in 90 days"\n\nGood tasks start with action verbs: *Write, Summarize, List, Explain, Compare, Generate, Analyze, Translate*.`,
                tip: 'One task per prompt is usually best. Multiple tasks can cause the AI to skimp on some.',
                quiz: {
                    q: 'Which task statement is most effective?',
                    options: [
                        'Tell me stuff about marketing',
                        'Write a 3-paragraph product description for a wireless keyboard targeting remote workers',
                        'Marketing content',
                        'Do marketing',
                    ],
                    answer: 1,
                },
            },
            {
                title: 'Context & Audience',
                content: `**Context** gives the AI the background it needs. Without it, the AI guesses — and often guesses wrong.\n\n**Audience context:** Tell AI who will read the output.\n- "for a 10-year-old"\n- "for a Ph.D.-level researcher"\n- "for a non-technical executive"\n\n**Situation context:** Why do you need this?\n- "I'm preparing a job interview"\n- "I need this for a client presentation"\n- "This is for a beginner Python course"\n\nContext shifts how the AI frames every sentence.`,
                tip: 'Include the "why" behind your request — it helps the AI choose the right tone and depth.',
                quiz: {
                    q: 'Why is specifying the audience important in a prompt?',
                    options: [
                        'It makes the prompt longer',
                        'It helps the AI choose the right tone, vocabulary, and depth',
                        'It confuses the AI',
                        'It is not important',
                    ],
                    answer: 1,
                },
            },
            {
                title: 'Output Format',
                content: `Specifying the **Output Format** tells the AI exactly how to present the information.\n\n**Common formats:**\n- Bullet list\n- Numbered steps\n- Table (with column names)\n- JSON or XML (for developers)\n- Paragraph (with headings)\n- Code block with comments\n\n**Example:**\n> "...Present your response as a table with three columns: Concept, Example, and Why It Matters."`,
                tip: 'If you want plain text with no extra commentary, explicitly say "Do not add any preamble or explanation."',
                quiz: {
                    q: 'What is the benefit of specifying an output format?',
                    options: [
                        'It makes the AI slower',
                        'It ensures the response is structured the way you need it',
                        'It limits creativity',
                        'It is not useful',
                    ],
                    answer: 1,
                },
            },
            {
                title: 'Constraints',
                content: `**Constraints** set boundaries on the AI's response. They help you control scope, length, tone, and more.\n\n**Examples of constraints:**\n- "Keep your response under 150 words"\n- "Do not include technical jargon"\n- "Only use information from before 2023"\n- "Avoid using the word 'utilize'"\n- "Do not recommend paid tools"\n\nConstraints are powerful for fine-tuning outputs and preventing common AI tendencies (like verbosity or hedging).`,
                tip: 'Negative constraints ("do not…") are just as powerful as positive ones.',
                quiz: {
                    q: 'Which is an example of a useful constraint?',
                    options: [
                        'Be nice',
                        'Keep the response under 100 words and avoid technical jargon',
                        'Answer everything',
                        'Use long sentences',
                    ],
                    answer: 1,
                },
            },
        ],
    },
};

export default function Lesson() {
    const { id } = useParams();
    const navigate = useNavigate();
    const course = courseData[id] || courseData[1];
    const [lessonIdx, setLessonIdx] = useState(0);
    const [selected, setSelected] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const lesson = course.lessons[lessonIdx];
    const isLast = lessonIdx === course.lessons.length - 1;

    const handleNext = () => {
        if (isLast) { navigate('/modules'); return; }
        setLessonIdx(i => i + 1);
        setSelected(null);
        setSubmitted(false);
    };

    const renderContent = (text) =>
        text.split('\n').map((line, i) => {
            if (line.startsWith('**') && line.endsWith('**'))
                return <strong key={i} style={{ display: 'block', margin: '12px 0 4px', color: 'var(--color-text)' }}>{line.slice(2, -2)}</strong>;
            if (line.startsWith('> '))
                return <blockquote key={i} className="lesson-quote">{renderInline(line.slice(2))}</blockquote>;
            if (line.startsWith('- '))
                return <li key={i} className="lesson-li">{renderInline(line.slice(2))}</li>;
            if (line.trim() === '') return <br key={i} />;
            return <p key={i} className="lesson-p">{renderInline(line)}</p>;
        });

    const renderInline = (text) => {
        const parts = text.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((p, i) =>
            p.startsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : p
        );
    };

    return (
        <div className="page animate-fadeIn">
            <div className="lesson-layout">
                {/* ── Sidebar ── */}
                <div className="lesson-sidebar">
                    <button className="btn btn-ghost" style={{ marginBottom: 8, paddingLeft: 0 }} onClick={() => navigate('/modules')}>
                        <ChevronLeft size={16} /> Back to Modules
                    </button>
                    <div className="lesson-module-title">{course.title}</div>
                    <div className="lesson-list">
                        {course.lessons.map((l, i) => (
                            <button
                                key={i}
                                className={`lesson-list-item ${i === lessonIdx ? 'active' : ''} ${i < lessonIdx ? 'done' : ''}`}
                                onClick={() => { setLessonIdx(i); setSelected(null); setSubmitted(false); }}
                            >
                                {i < lessonIdx ? <CheckCircle2 size={14} /> : <span className="lesson-num">{i + 1}</span>}
                                <span>{l.title}</span>
                            </button>
                        ))}
                    </div>
                    <div className="lesson-xp-preview">
                        <Zap size={14} color="var(--color-accent)" /> +{Math.round(120 / course.lessons.length)} XP per lesson
                    </div>
                </div>

                {/* ── Main Content ── */}
                <div className="lesson-main">
                    <div className="lesson-progress-row">
                        <span style={{ fontSize: '0.82rem', color: 'var(--color-muted)' }}>
                            Lesson {lessonIdx + 1} of {course.lessons.length}
                        </span>
                        <div className="progress-bar-track" style={{ flex: 1, maxWidth: 200 }}>
                            <div className="progress-bar-fill" style={{ width: `${((lessonIdx + 1) / course.lessons.length) * 100}%` }} />
                        </div>
                    </div>

                    <h1 className="lesson-title">{lesson.title}</h1>
                    <div className="lesson-content">{renderContent(lesson.content)}</div>

                    {/* Tip */}
                    <div className="lesson-tip">
                        <Lightbulb size={16} color="var(--color-accent)" />
                        <span>{lesson.tip}</span>
                    </div>

                    {/* Quiz */}
                    <div className="lesson-quiz card" style={{ padding: 24 }}>
                        <div className="quiz-label"><Star size={14} />Quick Check</div>
                        <p className="quiz-question">{lesson.quiz.q}</p>
                        <div className="quiz-options">
                            {lesson.quiz.options.map((opt, i) => {
                                let cls = 'quiz-option';
                                if (submitted) {
                                    if (i === lesson.quiz.answer) cls += ' correct';
                                    else if (i === selected) cls += ' wrong';
                                }
                                if (!submitted && i === selected) cls += ' selected';
                                return (
                                    <button
                                        key={i}
                                        className={cls}
                                        onClick={() => !submitted && setSelected(i)}
                                    >
                                        <span className="quiz-letter">{String.fromCharCode(65 + i)}</span>
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>
                        {!submitted ? (
                            <button
                                className="btn btn-primary"
                                style={{ marginTop: 16 }}
                                onClick={() => selected !== null && setSubmitted(true)}
                                disabled={selected === null}
                            >
                                Check Answer
                            </button>
                        ) : (
                            <div className={`quiz-result ${selected === lesson.quiz.answer ? 'success' : 'fail'}`}>
                                {selected === lesson.quiz.answer
                                    ? '🎉 Correct! Great understanding!'
                                    : `❌ Not quite. The correct answer is "${lesson.quiz.options[lesson.quiz.answer]}".`}
                            </div>
                        )}
                    </div>

                    <div className="lesson-actions">
                        <button className="btn btn-secondary" onClick={() => { if (lessonIdx > 0) { setLessonIdx(i => i - 1); setSelected(null); setSubmitted(false); } }}>
                            <ChevronLeft size={16} /> Previous
                        </button>
                        <button className="btn btn-primary" onClick={handleNext}>
                            {isLast ? 'Finish Module' : 'Next Lesson'} <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

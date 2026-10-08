"use client";
import { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectType, setProjectType] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const [formError, setFormError] = useState("");

  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const [projectError, setProjectError] = useState("");

  const validateStep1 = () => {
    if (!name.trim()) {
      return "Please enter your full name.";
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
      return "Name can only contain letters and spaces.";
    }

    if (!email.trim()) {
      return "Please enter your email address.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address.";
    }

    if (!phone.trim()) {
      return "Please enter your phone number.";
    }

    if (!isValidPhoneNumber(phone)) {
      return "Please enter a valid phone number.";
    }

    return "";
  };

  const validateStep3 = () => {
    const characterCount = description.trim().length;

    if (characterCount === 0) {
      return "Please describe your project.";
    }

    if (characterCount < 140) {
      return "Please provide at least 140 characters describing your project.";
    }

    return "";
  };

  const validateStep4 = () => {
    if (!budget) {
      return "Please select your budget.";
    }

    if (!timeline) {
      return "Please select your preferred timeline.";
    }

    if (!hasDesign) {
      return "Please let us know if you already have a design.";
    }

    return "";
  };

  const projectOptions = [
    "Website",
    "Landing Page",
    "WordPress",
    "E-commerce Store",
    "Web Application",
    "Website Redesign",
  ];

  const [description, setDescription] = useState("");

  const [descriptionError, setDescriptionError] = useState("");

  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");

  const budgetOptions = [
    "Under $1,000",
    "$1,000 - $3,000",
    "$3,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000+",
  ];

  const timelineOptions = [
    "As soon as possible",
    "Within 1 month",
    "1 - 3 months",
    "3 - 6 months",
    "I'm flexible",
  ];

  const [hasDesign, setHasDesign] = useState("");

  const [step4Error, setStep4Error] = useState("");

  const [submitted, setSubmitted] = useState(false);



  return (
    <main className="page">
      <div className="form-card">
        <h1>Start Your Project</h1>
        <p>Tell us a little about what you're looking for.</p>

        <div className="progress">
          {[1, 2, 3, 4, 5].map((step) => (
            <span
              key={step}
              className={currentStep >= step ? "active" : ""}
            ></span>
          ))}
        </div>

        <p className="step-text">Step {currentStep} of 5</p>

        {submitted ? (
          <div className="success-screen">
            <div className="success-icon">
              <svg
                viewBox="0 0 52 52"
                aria-hidden="true"
              >
                <circle
                  className="success-circle"
                  cx="26"
                  cy="26"
                  r="24"
                />

                <path
                  className="success-check"
                  d="M14 27 L22 35 L38 18"
                />
              </svg>
            </div>

            <h2>Submission Received!</h2>

            <p>
              Thank you for sharing your project details.
              <br />
              We'll get back to you shortly.
            </p>
          </div>
        ) : (
          <>
            {currentStep === 1 && (
              <>
                <h2>Your Details</h2>

                <div className="field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Sachin Bansal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setNameTouched(true)}
                  />
                  {(nameTouched && !name.trim()) && (
                    <p className="error-message">
                      Please enter your full name.
                    </p>
                  )}

                  {nameTouched &&
                    name.trim() &&
                    !/^[A-Za-z\s]+$/.test(name) && (
                      <p className="error-message">
                        Name can only contain letters and spaces.
                      </p>
                    )}
                </div>

                <div className="field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                  />
                  {emailTouched && !email.trim() && (
                    <p className="error-message">
                      Please enter your email address.
                    </p>
                  )}

                  {emailTouched &&
                    email.trim() &&
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                      <p className="error-message">
                        Please enter a valid email address.
                      </p>
                    )}
                </div>

                <div className="field">
                  <label>Phone Number</label>

                  <PhoneInput
                    international
                    defaultCountry="IN"
                    countryCallingCodeEditable={false}
                    value={phone}
                    onChange={(value) => {
                      setPhone(value || "");
                      setFormError("");
                    }}
                    onBlur={() => setPhoneTouched(true)}
                    placeholder="Enter phone number"
                  />

                  {phoneTouched && !phone.trim() && (
                    <p className="error-message">
                      Please enter your phone number.
                    </p>
                  )}
                  
                </div>

                <div className="field">
                  <label>Company / Business</label>
                  <input
                    type="text"
                    placeholder="Your company name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <h2>What Do You Need?</h2>

                <p className="field-description">
                  Select the type of project you're looking for.
                </p>

                <div className="project-options">
                  {projectOptions.map((option) => (
                    <button
                      type="button"
                      key={option}
                      className={projectType === option ? "selected" : ""}
                      onClick={() => {
                        setProjectType(option);
                        setProjectError("");
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {projectError && (
                  <p className="error-message">{projectError}</p>
                )}
              </>
            )}

            {currentStep === 3 && (
              <>
                <h2>Project Details</h2>

                <p className="field-description">
                  Tell us a little more about your project.
                </p>

                <div className="field">
                  <label>Project Description</label>

                  <textarea
                    value={description}
                    maxLength={1500}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setDescriptionError("");
                    }}
                    placeholder="Tell us about your project, goals, features, and anything else that would help us understand what you need."
                  />

                  <p className="character-count">
                    {description.length} / 1500
                  </p>
                  {descriptionError && (
                    <p className="error-message">
                      {descriptionError}
                    </p>
                  )}
                </div>            

                <div className="field">
                  <label>Current Website URL</label>

                  <input
                    type="url"
                    placeholder="https://example.com"
                  />
                </div>

                <div className="field">
                  <label>Required Features</label>

                  <textarea
                    placeholder="For example: Contact form, booking system, payment integration..."
                  />
                </div>
              </>
            )}

            {currentStep === 4 && (
              <>
                <h2>Budget & Timeline</h2>

                <p className="field-description">
                  Help us understand your budget and preferred timeline.
                </p>

                <div className="field">
                  <label>What's your budget?</label>

                  <div className="project-options">
                    {budgetOptions.map((option) => (
                      <button
                        type="button"
                        key={option}
                        className={budget === option ? "selected" : ""}
                        onClick={() => {
                          setBudget(option);
                          setStep4Error("");
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="field">
                  <label>When would you like to start?</label>

                  <div className="project-options">
                    {timelineOptions.map((option) => (
                      <button
                        type="button"
                        key={option}
                        className={timeline === option ? "selected" : ""}
                        onClick={() => {
                          setTimeline(option);
                          setStep4Error("");
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="field">
                  <label>Do you already have a design?</label>

                  <div className="project-options">
                    <button
                      type="button"
                      className={hasDesign === "Yes" ? "selected" : ""}
                      onClick={() => {
                        setHasDesign("Yes");
                        setStep4Error("");
                      }}
                    >
                      Yes
                    </button>

                    <button
                      type="button"
                      className={hasDesign === "No" ? "selected" : ""}
                      onClick={() => {
                        setHasDesign("No");
                        setStep4Error("");
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>

                {step4Error && (
                  <p className="error-message">{step4Error}</p>
                )}
              </>
            )}

            {currentStep === 5 && (
              <>
                <h2>Review Your Project</h2>

                <p className="field-description">
                  Please review the information below before submitting your project inquiry.
                </p>

                <div className="review-section">
                  <div className="review-heading">
                    <h3>Your Details</h3>

                    <button
                      type="button"
                      className="edit-button"
                      onClick={() => setCurrentStep(1)}
                    >
                      Edit
                    </button>
                  </div>

                  <div className="review-item">
                    <span>Full Name</span>
                    <strong>{name}</strong>
                  </div>

                  <div className="review-item">
                    <span>Email</span>
                    <strong>{email}</strong>
                  </div>

                  <div className="review-item">
                    <span>Phone</span>
                    <strong>{phone}</strong>
                  </div>

                  <div className="review-item">
                    <span>Company</span>
                    <strong>{company || "Not provided"}</strong>
                  </div>
                </div>

                <div className="review-section">
                  <div className="review-heading">
                    <h3>Project</h3>

                    <button
                      type="button"
                      className="edit-button"
                      onClick={() => setCurrentStep(2)}
                    >
                      Edit
                    </button>
                  </div>

                  <div className="review-item">
                    <span>Project Type</span>
                    <strong>{projectType}</strong>
                  </div>

                  <div className="review-item">
                    <span>Project Description</span>
                    <strong>{description}</strong>
                  </div>
                </div>

                <div className="review-section">
                  <div className="review-heading">
                    <h3>Budget & Timeline</h3>

                    <button
                      type="button"
                      className="edit-button"
                      onClick={() => setCurrentStep(4)}
                    >
                      Edit
                    </button>
                  </div>

                  <div className="review-item">
                    <span>Budget</span>
                    <strong>{budget}</strong>
                  </div>

                  <div className="review-item">
                    <span>Timeline</span>
                    <strong>{timeline}</strong>
                  </div>

                  <div className="review-item">
                    <span>Design Ready</span>
                    <strong>{hasDesign}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                >
                  Submit Project Inquiry
                </button>
              </>
            )}
          </>
        )}

        <div className="form-navigation">
          {currentStep > 1 && !submitted && (
            <button
              type="button"
              className="back-button"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              ← Back
            </button>
          )}

          {currentStep < 5 && (
            <button
              type="button"
              onClick={() => {

                if (currentStep === 1) {
                  setNameTouched(true);
                  setEmailTouched(true);
                  setPhoneTouched(true);

                  const error = validateStep1();

                  if (error) {
                    setFormError(error);
                    return;
                  }
                }

                if (currentStep === 2 && projectType === "") {
                  setProjectError("Please select a project type.");
                  return;
                }

                if (currentStep === 3) {
                  const error = validateStep3();

                  if (error) {
                    setDescriptionError(error);
                    return;
                  }
                }

                if (currentStep === 4) {
                  const error = validateStep4();

                  if (error) {
                    setStep4Error(error);
                    return;
                  }
                }

                setFormError("");
                setProjectError("");
                setDescriptionError("");
                setStep4Error("");

                setCurrentStep(currentStep + 1);
              }}
            >
              Continue →
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
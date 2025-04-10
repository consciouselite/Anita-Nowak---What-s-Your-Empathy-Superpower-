import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || '');

// Research model for deep analysis
const researchModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-thinking-exp-01-21' });

// Content generation model for quiz content
const contentModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

export interface ResearchInput {
  quizTopic: string;
  targetAudience: {
    demographics: string;
    psychographics: string;
    painPoints: string[];
    aspirations: string[];
    currentState: string;
  };
  framework: 'Score' | 'Type' | 'Killer';
}

export interface ContentInput {
  researchThemes: string;
  quizTopic: string;
  framework: 'Score' | 'Type' | 'Killer';
}

export class AIGenerationService {
  /**
   * Generates research themes using the thinking model
   */
  static async generateResearchThemes(input: ResearchInput): Promise<string> {
    try {
      const prompt = `
        Using the Quiz Research Themes Generator Prompt, analyze the following quiz concept:
        
        Quiz Topic: ${input.quizTopic}
        Framework: ${input.framework}
        
        Target Audience:
        Demographics: ${input.targetAudience.demographics}
        Psychographics: ${input.targetAudience.psychographics}
        Pain Points: ${input.targetAudience.painPoints.join(', ')}
        Aspirations: ${input.targetAudience.aspirations.join(', ')}
        Current State: ${input.targetAudience.currentState}
        
        Generate comprehensive research themes following the prompt's structure.
      `;

      const result = await researchModel.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating research themes:', error);
      throw new Error('Failed to generate research themes');
    }
  }

  /**
   * Generates quiz content using the flash model
   */
  static async generateQuizContent(input: ContentInput): Promise<string> {
    try {
      const prompt = `
        Using the ${input.framework} Framework Prompt, create quiz content based on the following research:
        
        Research Themes: ${input.researchThemes}
        Quiz Topic: ${input.quizTopic}
        
        Generate complete quiz content following the framework's structure.
      `;

      const result = await contentModel.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating quiz content:', error);
      throw new Error('Failed to generate quiz content');
    }
  }

  /**
   * Validates generated content against framework requirements
   */
  static async validateContent(content: string, framework: 'Score' | 'Type' | 'Killer'): Promise<boolean> {
    try {
      const prompt = `
        Validate the following ${framework} Framework quiz content against the framework requirements:
        
        ${content}
        
        Check for:
        1. Correct number of questions (9-12)
        2. Proper framework-specific structure
        3. Required components (title, subtitle, questions, results)
        4. Framework-specific terminology
        5. Follow-up script requirements
        
        Return true if valid, false if invalid.
      `;

      const result = await researchModel.generateContent(prompt);
      const response = await result.response;
      return response.text().toLowerCase().includes('true');
    } catch (error) {
      console.error('Error validating content:', error);
      throw new Error('Failed to validate content');
    }
  }
} 
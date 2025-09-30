interface ATSCheckerProps {
  onNavigate: (page: string) => void;
  gameData: {
    xp: number;
    totalXp: number;
  };
  updateGameData: (updates: Partial<ATSCheckerProps["gameData"]>) => void;
}

interface AnalysisResult {
  score: number;
  similarity: number;
  status: 'success' | 'warning' | 'error';
  missingKeywords: string[];
  suggestions: string[];
  buildMessage: string;
  xpGained: number;
}

import { useState } from 'react';
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Progress } from "../components/Progress";
import { Textarea } from "../components/Textarea";
import { Upload, FileText, Zap, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

export default function ATSChecker({ onNavigate, gameData, updateGameData }: ATSCheckerProps) {
  const [step, setStep] = useState('upload'); // 'upload', 'analyzing', 'results'
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [progress, setProgress] = useState(0);

  const runATSCheck = () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      return;
    }

    setStep('analyzing');
    setProgress(0);

    // Simulate analysis with progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          generateAnalysisResult();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const generateAnalysisResult = () => {
    // Mock AI analysis - calculate similarity based on keyword overlap
    const resumeWords = new Set(resumeText.toLowerCase().split(/\W+/).filter(word => word.length > 3));
    const jobWords = new Set(jobDescription.toLowerCase().split(/\W+/).filter(word => word.length > 3));
    
    const intersection = new Set([...resumeWords].filter(word => jobWords.has(word)));
    const similarity = Math.min(0.95, Math.max(0.35, intersection.size / Math.max(jobWords.size, 20)));
    
    const score = Math.round(similarity * 100);
    
    // Generate missing keywords
    const importantKeywords = ['quantum-computing', 'stellar-navigation', 'cosmic-analysis', 'leadership', 'agile', 'neural-networks', 'space-systems', 'interstellar-comm'];
    const missingKeywords = importantKeywords.filter(keyword => 
      !resumeText.toLowerCase().includes(keyword) && jobDescription.toLowerCase().includes(keyword)
    );

    // Calculate XP gained
    const xpGained = score >= 80 ? 100 : score >= 60 ? 75 : 50;

    const result = {
      score,
      similarity,
      status: score >= 85 ? 'success' : score >= 65 ? 'warning' : 'error',
      missingKeywords: missingKeywords.slice(0, 4),
      suggestions: [
        score < 50 ? "Add more relevant technical skills" : "Consider quantifying your achievements",
        "Include specific project outcomes and metrics",
        "Match the job description's language more closely",
        "Add relevant certifications or courses"
      ].slice(0, 3),
      buildMessage: getBuildMessage(score),
      xpGained
    };

    setAnalysisResult(result as AnalysisResult);
    setStep('results');

    // Use setTimeout to defer the state update to avoid updating during render
    setTimeout(() => {
      updateGameData({
        xp: gameData.xp + xpGained,
        totalXp: gameData.totalXp + xpGained
      });
    }, 0);
  };

  const getBuildMessage = (score: number): string => {
    if (score >= 85) return "Trajectory calculation complete! Ready for launch 🚀🔥";
    if (score >= 70) return "Flight path approved with minor adjustments ⚠️";
    if (score >= 50) return "Navigation errors detected 🐛";
    return "Mission trajectory failed. Recalibrate instruments 🤦";
  };

  const getStatusIcon = (status: 'success' | 'warning' | 'error') => {
    switch (status) {
      case 'success': return <CheckCircle className="w-8 h-8 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-8 h-8 text-yellow-600" />;
      case 'error': return <XCircle className="w-8 h-8 text-red-600" />;
      default: return null;
    }
  };

  if (step === 'analyzing') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
        
        <Card className="p-8 bg-slate-900/90 backdrop-blur-sm border-2 border-cyan-400 text-cyan-400 max-w-2xl w-full relative z-10 font-mono">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl mb-4">🛸 Trajectory Calculator Running...</h2>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span>$ quantum-install career-navigation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span>Parsing Flight Log... Done ✅</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span>Analyzing Mission Parameters... Done ✅</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>Running Navigation Algorithm... {progress}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Calculating Cosine Similarity...</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Build Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-gray-700" />
            </div>

            <div className="text-xs text-gray-400 text-center">
              Compiling your career potential... Please don't close this terminal 💻
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (step === 'results') {
    return (
      <div className="min-h-screen p-4 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
        
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl mb-2 text-cyan-400 font-mono">🛸 Trajectory Analysis Complete</h1>
            <p className="text-slate-300">Your mission navigation results are in!</p>
          </div>

          {/* Main Results */}
          <Card className="p-8 bg-slate-900/90 backdrop-blur-sm border-2 border-cyan-400 text-cyan-400 font-mono">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {analysisResult && getStatusIcon(analysisResult.status)}
                  <div>
                    <h3 className="text-2xl text-white">
                      Build Status: {analysisResult && analysisResult.buildMessage}
                    </h3>
                    <p className="text-gray-300">
                      {analysisResult && <>Cosine Similarity: {analysisResult.similarity.toFixed(2)} ({analysisResult.score}% Match)</>}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-white">{analysisResult && analysisResult.score}%</div>
                  <div className="text-sm text-gray-400">ATS Score</div>
                </div>
              </div>

              <div className="bg-black/50 p-4 rounded-lg border border-gray-600">
                <pre className="text-sm">
{analysisResult && `> Running ATS Check...
> Parsing Resume... Done ✅
> Comparing to Job Description... Done ✅
> Cosine Similarity: ${analysisResult.similarity.toFixed(2)} (${analysisResult.score}% Match) 🎯
> Build Status: ${analysisResult.status.toUpperCase()} ${analysisResult.status === 'success' ? '✅' : analysisResult.status === 'warning' ? '⚠️' : '❌'}`}
                </pre>
              </div>
            </div>
          </Card>

          {/* Missing Dependencies */}
          {analysisResult && analysisResult.missingKeywords.length > 0 && (
            <Card className="p-6 bg-gray-900/90 backdrop-blur-sm border-2 border-yellow-400">
              <h3 className="text-xl text-yellow-400 mb-4 font-mono">⚠️ Missing Dependencies</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {analysisResult.missingKeywords.map((keyword, index) => (
                  <div key={index} className="bg-yellow-400/20 text-yellow-300 p-3 rounded border border-yellow-400/50 text-center font-mono">
                    {keyword}
                  </div>
                ))}
              </div>
              <p className="text-gray-300 mt-4 text-sm">
                💡 Consider adding these skills to improve your match score
              </p>
            </Card>
          )}

          {/* Suggestions */}
          <Card className="p-6 bg-gray-900/90 backdrop-blur-sm border-2 border-blue-400">
            <h3 className="text-xl text-blue-400 mb-4 font-mono">🔧 Optimization Suggestions</h3>
            <div className="space-y-3">
              {analysisResult && analysisResult.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <p className="text-gray-300">{suggestion}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* XP Gained */}
          <Card className="p-4 bg-purple-900/90 backdrop-blur-sm border-2 border-purple-400 text-center">
            <p className="text-purple-300">
              {analysisResult && <>🎉 Analysis Complete! +{analysisResult.xpGained} XP Gained</>}
            </p>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => {
                setStep('upload');
                setAnalysisResult(null);
                setProgress(0);
              }}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-full"
            >
              🔄 Analyze Another Resume
            </Button>
            
            <Button
              onClick={() => onNavigate('dashboard')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full"
            >
              📊 Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
      
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl mb-2 text-cyan-400 font-mono">🛸 Trajectory Calculator</h1>
          <p className="text-slate-300">Analyze your path with AI-powered navigation systems</p>
        </div>

        {/* Terminal Style Instructions */}
        <Card className="p-6 bg-slate-900/90 backdrop-blur-sm border-2 border-cyan-400 text-cyan-400 font-mono">
          <div className="space-y-2 text-sm">
            <div>$ navigation-calc --help</div>
            <div className="text-slate-400">
              Usage: Upload your flight log and paste mission parameters to run trajectory analysis<br/>
              Output: Match percentage, missing systems, and optimization suggestions<br/>
              Exit: Use Ctrl+C to return to base (just kidding, use the button) 😄
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Resume Upload */}
          <Card className="p-6 bg-gray-900/90 backdrop-blur-sm border-2 border-blue-400">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl text-blue-400">📄 Resume Input</h3>
              </div>
              
              <div className="bg-blue-400/20 border border-blue-400/50 rounded-lg p-4 text-blue-200 text-sm">
                💡 Paste your resume text or upload a file (PDF parsing coming soon!)
              </div>

              <Textarea
                placeholder="Paste your resume text here...

Example:
Software Engineer with 3+ years experience in React, Node.js, and Python. Built scalable applications serving 10k+ users. Led team of 4 developers..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="min-h-48 bg-gray-800 border-blue-400/50 text-gray-200 font-mono text-sm"
              />

              <div className="text-xs text-gray-400">
                Characters: {resumeText.length} | Lines: {resumeText.split('\n').length}
              </div>
            </div>
          </Card>

          {/* Job Description */}
          <Card className="p-6 bg-gray-900/90 backdrop-blur-sm border-2 border-purple-400">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Zap className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl text-purple-400">🎯 Job Description</h3>
              </div>
              
              <div className="bg-purple-400/20 border border-purple-400/50 rounded-lg p-4 text-purple-200 text-sm">
                🎯 Copy the job posting you're targeting
              </div>

              <Textarea
                placeholder="Paste the job description here...

Example:
We're looking for a Senior Frontend Developer with expertise in React, TypeScript, and modern web technologies. You'll lead development of user-facing features..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-48 bg-gray-800 border-purple-400/50 text-gray-200 font-mono text-sm"
              />

              <div className="text-xs text-gray-400">
                Characters: {jobDescription.length} | Words: {jobDescription.split(' ').length}
              </div>
            </div>
          </Card>
        </div>

        {/* Run Analysis Button */}
        <div className="text-center">
          <Button
            onClick={runATSCheck}
            disabled={!resumeText.trim() || !jobDescription.trim()}
            className={`px-12 py-6 text-xl rounded-full shadow-xl transition-all duration-200 transform ${
              !resumeText.trim() || !jobDescription.trim()
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:scale-105'
            } text-white font-mono`}
          >
            {!resumeText.trim() || !jobDescription.trim() 
              ? '📝 Complete Both Fields' 
              : '🚀 Compile Career'}
          </Button>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => onNavigate('dashboard')}
            className="text-gray-400 hover:text-gray-200"
          >
            ← Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
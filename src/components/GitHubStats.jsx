import React, { useState, useEffect } from 'react';
import { Github, Star, GitFork, Eye, Calendar } from 'lucide-react';

const GitHubStats = () => {
  const [stats, setStats] = useState({
    publicRepos: 11,
    followers: 5,
    following: 0,
    totalStars: 0,
    contributions: 105
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch real GitHub stats
  useEffect(() => {
    const fetchGitHubStats = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://api.github.com/users/SaadSaid158');
        if (response.ok) {
          const data = await response.json();
          
          // Fetch repositories to calculate total stars
          const reposResponse = await fetch('https://api.github.com/users/SaadSaid158/repos');
          let totalStars = 0;
          if (reposResponse.ok) {
            const repos = await reposResponse.json();
            totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
          }

          setStats({
            publicRepos: data.public_repos,
            followers: data.followers,
            following: data.following,
            totalStars: totalStars,
            contributions: 105 // This would need GitHub GraphQL API for accurate data
          });
        }
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        // Keep default values on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-slate-300 flex items-center">
          <Github size={16} className="mr-2" />
          Public Repos:
        </span>
        <span className="text-[#00d4aa] font-mono">
          {isLoading ? '...' : stats.publicRepos}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-slate-300 flex items-center">
          <Star size={16} className="mr-2" />
          Total Stars:
        </span>
        <span className="text-[#00d4aa] font-mono">
          {isLoading ? '...' : stats.totalStars}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-slate-300 flex items-center">
          <Eye size={16} className="mr-2" />
          Followers:
        </span>
        <span className="text-[#00d4aa] font-mono">
          {isLoading ? '...' : stats.followers}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-slate-300 flex items-center">
          <Calendar size={16} className="mr-2" />
          Contributions:
        </span>
        <span className="text-[#00d4aa] font-mono">
          {isLoading ? '...' : stats.contributions}+
        </span>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-600">
        <a 
          href="https://github.com/SaadSaid158" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#00d4aa] hover:text-[#0891b2] transition-colors flex items-center text-sm"
        >
          <Github size={14} className="mr-1" />
          View GitHub Profile
        </a>
      </div>
    </div>
  );
};

export default GitHubStats;


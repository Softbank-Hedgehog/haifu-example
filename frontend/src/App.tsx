import React, { useState, useEffect } from 'react';

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

const API_URL = 'http://localhost:8000';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      
      if (response.ok) {
        setTitle('');
        setContent('');
        fetchPosts();
      }
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await fetch(`${API_URL}/posts/${id}`, { method: 'DELETE' });
      fetchPosts();
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    content: {
      maxWidth: '900px',
      margin: '0 auto',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)'
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '40px',
      color: '#2d3748',
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'
    },
    form: {
      backgroundColor: '#f8fafc',
      padding: '30px',
      borderRadius: '15px',
      marginBottom: '40px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
    },
    input: {
      width: '100%',
      padding: '15px',
      border: '2px solid #e2e8f0',
      borderRadius: '10px',
      fontSize: '16px',
      marginBottom: '15px',
      transition: 'all 0.3s ease',
      outline: 'none',
      boxSizing: 'border-box' as const
    },
    textarea: {
      width: '100%',
      padding: '15px',
      border: '2px solid #e2e8f0',
      borderRadius: '10px',
      fontSize: '16px',
      height: '120px',
      resize: 'vertical' as const,
      marginBottom: '20px',
      transition: 'all 0.3s ease',
      outline: 'none',
      boxSizing: 'border-box' as const,
      fontFamily: 'inherit'
    },
    button: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      padding: '15px 30px',
      borderRadius: '25px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
      disabled: isLoading
    },
    deleteButton: {
      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginLeft: '10px',
      boxShadow: '0 2px 8px rgba(255, 107, 107, 0.3)'
    },
    postCard: {
      backgroundColor: 'white',
      borderRadius: '15px',
      padding: '25px',
      marginBottom: '20px',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
      border: '1px solid #f1f5f9',
      transition: 'all 0.3s ease',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    postTitle: {
      color: '#2d3748',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '15px',
      borderBottom: '2px solid #e2e8f0',
      paddingBottom: '10px'
    },
    postContent: {
      color: '#4a5568',
      fontSize: '1rem',
      lineHeight: '1.6',
      marginBottom: '20px',
      whiteSpace: 'pre-wrap' as const
    },
    postMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#718096',
      fontSize: '0.9rem'
    },
    emptyState: {
      textAlign: 'center' as const,
      padding: '60px 20px',
      color: '#718096',
      fontSize: '1.2rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.header}>✨ Community ✨</h1>
        
        <form onSubmit={createPost} style={styles.form}>
          <input
            type="text"
            placeholder="📝 Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              ...styles.input,
              borderColor: title ? '#667eea' : '#e2e8f0'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = title ? '#667eea' : '#e2e8f0'}
          />
          <textarea
            placeholder="💭 Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              ...styles.textarea,
              borderColor: content ? '#667eea' : '#e2e8f0'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = content ? '#667eea' : '#e2e8f0'}
          />
          <button 
            type="submit" 
            style={{
              ...styles.button,
              opacity: isLoading ? 0.7 : 1,
              transform: isLoading ? 'scale(0.98)' : 'scale(1)'
            }}
            disabled={isLoading}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }
            }}
          >
            {isLoading ? '⏳ Creating...' : '🚀 Create Post'}
          </button>
        </form>

        <div>
          {posts.length === 0 ? (
            <div style={styles.emptyState}>
              📭 No posts yet.<br/>
              Create your first post!
            </div>
          ) : (
            posts.map((post, index) => (
              <div 
                key={post.id} 
                style={{
                  ...styles.postCard,
                  animationDelay: `${index * 0.1}s`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
                }}
              >
                <h3 style={styles.postTitle}>{post.title}</h3>
                <p style={styles.postContent}>{post.content}</p>
                <div style={styles.postMeta}>
                  <span>🕒 {new Date(post.created_at).toLocaleString('en-US')}</span>
                  <button 
                    onClick={() => deletePost(post.id)}
                    style={styles.deleteButton}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 107, 107, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 107, 107, 0.3)';
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
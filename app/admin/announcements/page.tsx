'use client';

import { mockAnnouncements } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function AdminAnnouncementsPage() {
  const [showNewForm, setShowNewForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'Medium' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowNewForm(false);
    setFormData({ title: '', content: '', priority: 'Medium' });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Announcements Management</h1>
          <p className="text-muted-foreground text-sm">Create and manage company announcements</p>
        </div>
        <Button onClick={() => setShowNewForm(!showNewForm)} className="bg-primary text-primary-foreground">
          {showNewForm ? 'Cancel' : '+ New Announcement'}
        </Button>
      </div>

      {/* New Announcement Form */}
      {showNewForm && (
        <Card className="p-6 border-0 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Create New Announcement</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Announcement title"
                required
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Announcement content..."
                required
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[150px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={() => setShowNewForm(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground">
                Post Announcement
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Statistics */}
      <Card className="p-6 border-0 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Announcements</p>
            <p className="text-3xl font-bold text-foreground">{mockAnnouncements.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">High Priority</p>
            <p className="text-3xl font-bold text-red-600">{mockAnnouncements.filter((a) => a.priority === 'High').length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">This Month</p>
            <p className="text-3xl font-bold text-primary">{mockAnnouncements.length}</p>
          </div>
        </div>
      </Card>

      {/* Announcements List */}
      <div className="space-y-4">
        {mockAnnouncements.map((announcement) => (
          <Card key={announcement.id} className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-lg font-semibold text-foreground">{announcement.title}</h2>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(announcement.priority)}`}>
                    {announcement.priority}
                  </span>
                </div>
                <p className="text-foreground mb-3 leading-relaxed">{announcement.content}</p>
                <p className="text-xs text-muted-foreground">
                  Posted by {announcement.postedBy} on {new Date(announcement.postedDate).toLocaleDateString()}
                </p>
              </div>

              <div className="ml-4 flex gap-2">
                <Button size="sm" variant="outline" className="h-8 text-xs">
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="h-8 text-xs text-red-600 border-red-200">
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

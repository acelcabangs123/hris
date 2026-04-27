'use client';

import { mockAnnouncements } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';

export default function AnnouncementsPage() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700 border-l-4 border-red-500';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border-l-4 border-yellow-500';
      case 'Low':
        return 'bg-green-100 text-green-700 border-l-4 border-green-500';
      default:
        return 'bg-gray-100 text-gray-700 border-l-4 border-gray-500';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High':
        return '⚠️';
      case 'Medium':
        return 'ℹ️';
      case 'Low':
        return '✓';
      default:
        return '📌';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Announcements</h1>
        <p className="text-muted-foreground text-sm">Stay updated with company announcements</p>
      </div>

      {/* Filter and Sort */}
      <div className="flex items-center gap-4">
        <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          <option>All Announcements</option>
          <option>High Priority</option>
          <option>Medium Priority</option>
          <option>Low Priority</option>
        </select>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {mockAnnouncements.map((announcement) => (
          <Card
            key={announcement.id}
            className={`p-6 border-0 shadow-sm hover:shadow-md transition-all cursor-pointer ${getPriorityColor(announcement.priority)}`}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{getPriorityIcon(announcement.priority)}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground mb-2">{announcement.title}</h2>
                    <p className="text-foreground mb-4 leading-relaxed">{announcement.content}</p>
                  </div>
                  <div className="ml-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      announcement.priority === 'High'
                        ? 'bg-red-200 text-red-800'
                        : announcement.priority === 'Medium'
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-green-200 text-green-800'
                    }`}>
                      {announcement.priority} Priority
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-current border-opacity-20">
                  <div className="text-xs font-medium opacity-75">
                    Posted by <span className="font-semibold">{announcement.postedBy}</span> on{' '}
                    {new Date(announcement.postedDate).toLocaleDateString()}
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-foreground/10 hover:bg-foreground/20 transition-colors text-xs font-semibold">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State Example */}
      {mockAnnouncements.length === 0 && (
        <Card className="p-12 border-0 shadow-sm text-center">
          <p className="text-lg text-muted-foreground mb-2">No announcements yet</p>
          <p className="text-sm text-muted-foreground">Check back soon for company updates</p>
        </Card>
      )}
    </div>
  );
}

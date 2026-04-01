'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/lib/store';
import {
  HeadphonesIcon,
  Search,
  ChevronDown,
  ChevronUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MessageSquare,
} from 'lucide-react';

export default function SuperAdminTicketsPage() {
  const { tickets, updateTicketStatus } = useApp();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const matchStatus = statusFilter === 'all' || t.status === statusFilter;
      const matchSearch =
        t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [tickets, statusFilter, searchQuery]);

  const priorityColors: Record<string, { bg: string; text: string; dot: string; gradient: string; glow: string }> = {
    low: { bg: 'bg-gray-50 border border-gray-200', text: 'text-gray-600', dot: 'bg-gray-400', gradient: 'from-gray-400 to-gray-500', glow: '' },
    medium: { bg: 'bg-blue-50 border border-blue-200', text: 'text-blue-700', dot: 'bg-blue-500', gradient: 'from-blue-400 to-blue-600', glow: '' },
    high: { bg: 'bg-orange-50 border border-orange-200', text: 'text-orange-700', dot: 'bg-orange-500', gradient: 'from-orange-400 to-orange-600', glow: '' },
    urgent: { bg: 'bg-red-50 border border-red-200', text: 'text-red-700', dot: 'bg-red-500 animate-glow-pulse', gradient: 'from-red-500 to-rose-600', glow: 'shadow-glow' },
  };

  const statusColors: Record<string, { badge: string; gradient: string }> = {
    open: { badge: 'bg-blue-50 text-blue-700 border border-blue-200', gradient: 'from-blue-500 to-indigo-600' },
    in_progress: { badge: 'bg-amber-50 text-amber-700 border border-amber-200', gradient: 'from-amber-500 to-orange-600' },
    resolved: { badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200', gradient: 'from-emerald-500 to-green-600' },
    closed: { badge: 'bg-gray-50 text-gray-600 border border-gray-200', gradient: 'from-gray-400 to-gray-500' },
  };

  const statusIcons: Record<string, React.ReactNode> = {
    open: <Clock className="w-4 h-4" />,
    in_progress: <AlertTriangle className="w-4 h-4" />,
    resolved: <CheckCircle className="w-4 h-4" />,
    closed: <XCircle className="w-4 h-4" />,
  };

  const nextStatus: Record<string, string> = {
    open: 'in_progress',
    in_progress: 'resolved',
    resolved: 'closed',
  };

  const statusLabels: Record<string, string> = {
    open: 'Open',
    in_progress: 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed',
  };

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    tickets.forEach((t) => {
      counts[t.status] = (counts[t.status] || 0) + 1;
    });
    return counts;
  }, [tickets]);

  const statCards = [
    { key: 'open', label: 'Open', icon: Clock, gradient: 'from-blue-500 to-indigo-600', bg: 'from-blue-50 to-indigo-50', hoverBorder: 'hover:border-blue-300' },
    { key: 'in_progress', label: 'In Progress', icon: AlertTriangle, gradient: 'from-amber-500 to-orange-600', bg: 'from-amber-50 to-orange-50', hoverBorder: 'hover:border-amber-300' },
    { key: 'resolved', label: 'Resolved', icon: CheckCircle, gradient: 'from-emerald-500 to-green-600', bg: 'from-emerald-50 to-green-50', hoverBorder: 'hover:border-emerald-300' },
    { key: 'closed', label: 'Closed', icon: XCircle, gradient: 'from-gray-400 to-gray-500', bg: 'from-gray-50 to-slate-50', hoverBorder: 'hover:border-gray-300' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="animate-fade-in-up stagger-1">
        <h1 className="text-2xl font-bold text-gradient">Support Tickets</h1>
        <p className="text-slate-500 mt-1">Manage and resolve restaurant support requests.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.key}
              className={`card-premium rounded-2xl p-4 cursor-pointer card-hover transition-all duration-300 ${stat.hoverBorder} animate-fade-in-up stagger-${index + 2}`}
              onClick={() => setStatusFilter(statusFilter === stat.key ? 'all' : stat.key)}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-sm`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-gradient">{statusCounts[stat.key] || 0}</p>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="card-premium rounded-2xl p-4 animate-fade-in-up stagger-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <div className="input-premium flex items-center gap-2 px-3 py-2.5 rounded-xl">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search tickets by ID, subject, or restaurant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-premium px-3 py-2 rounded-xl text-sm text-slate-700 outline-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-3">
        {filteredTickets.length === 0 ? (
          <div className="card-premium rounded-2xl p-12 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mx-auto">
              <HeadphonesIcon className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-500 mt-4">No tickets found matching your filters.</p>
          </div>
        ) : (
          filteredTickets.map((ticket, index) => {
            const priority = priorityColors[ticket.priority];
            const isExpanded = expandedTicket === ticket.id;
            const next = nextStatus[ticket.status] as typeof ticket.status | undefined;

            return (
              <div
                key={ticket.id}
                className={`card-premium rounded-2xl overflow-hidden transition-all duration-300 animate-fade-in-up stagger-${Math.min(index % 6 + 1, 8)} ${priority.glow}`}
              >
                {/* Ticket Header Row */}
                <div
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-transparent transition-all duration-200"
                  onClick={() => setExpandedTicket(isExpanded ? null : ticket.id)}
                >
                  {/* Priority dot */}
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${priority.dot}`} />

                  {/* ID */}
                  <span className="text-xs font-mono text-slate-400 w-20 flex-shrink-0">{ticket.id}</span>

                  {/* Restaurant */}
                  <span className="text-sm text-slate-500 w-32 flex-shrink-0 truncate hidden sm:block">
                    {ticket.restaurantName}
                  </span>

                  {/* Subject */}
                  <span className="text-sm font-medium text-slate-800 flex-1 truncate">{ticket.subject}</span>

                  {/* Priority badge */}
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${priority.bg} ${priority.text} hidden md:flex items-center gap-1`}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${priority.gradient}`} />
                    {ticket.priority}
                  </span>

                  {/* Status badge */}
                  <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${(statusColors[ticket.status] || statusColors.open).badge}`}>
                    {statusLabels[ticket.status]}
                  </span>

                  {/* Date */}
                  <span className="text-xs text-slate-400 w-24 text-right hidden lg:block">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </span>

                  {/* Chevron */}
                  <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-slate-100 px-5 py-5 bg-gradient-to-br from-slate-50/30 to-white animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="p-3 bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-100">
                        <p className="text-xs text-slate-400 mb-1">Restaurant</p>
                        <p className="text-sm font-medium text-slate-700">{ticket.restaurantName}</p>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-100">
                        <p className="text-xs text-slate-400 mb-1">Priority</p>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase ${priority.bg} ${priority.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
                          {ticket.priority}
                        </span>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-100">
                        <p className="text-xs text-slate-400 mb-1">Created</p>
                        <p className="text-sm text-slate-700">{new Date(ticket.createdAt).toLocaleString()}</p>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-100">
                        <p className="text-xs text-slate-400 mb-1">Last Updated</p>
                        <p className="text-sm text-slate-700">{new Date(ticket.updatedAt).toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="mb-5">
                      <p className="text-xs text-slate-400 mb-1.5">Description</p>
                      <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                        <p className="text-sm text-slate-700 leading-relaxed">{ticket.description}</p>
                      </div>
                    </div>

                    <div className="divider-gradient mb-4" />

                    {/* Status workflow */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-slate-400 font-medium">Change status:</span>
                      {(['open', 'in_progress', 'resolved', 'closed'] as const).map((s) => {
                        const sColor = statusColors[s] || statusColors.open;
                        return (
                          <button
                            key={s}
                            onClick={() => updateTicketStatus(ticket.id, s)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                              ticket.status === s
                                ? `bg-gradient-to-r ${sColor.gradient} text-white shadow-lg ring-2 ring-offset-1 ring-white/50`
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:shadow-sm'
                            }`}
                          >
                            {statusLabels[s]}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

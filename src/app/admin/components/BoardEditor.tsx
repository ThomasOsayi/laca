"use client";

import { useState, useEffect } from "react";
import { useSiteDoc, saveSiteDoc } from "@/lib/hooks";
import AdminModal from "./AdminModal";
import ImageUpload from "./ImageUpload";

interface BoardMember {
  id: string;
  name: string;
  role: string;
  email: string;
  affiliation: string;
  photo: string;
  initials: string;
}

export default function BoardEditor() {
  const { data, loading } = useSiteDoc("board");
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data?.members) setMembers(data.members);
  }, [data]);

  const save = async () => {
    setSaving(true);
    await saveSiteDoc("board", { members });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addMember = () => {
    const newMember: BoardMember = {
      id: Date.now().toString(),
      name: "",
      role: "",
      email: "",
      affiliation: "",
      photo: "",
      initials: "",
    };
    setMembers([...members, newMember]);
    setEditingId(newMember.id);
  };

  const updateMember = (id: string, field: keyof BoardMember, value: string) => {
    setMembers(
      members.map((m) => {
        if (m.id !== id) return m;
        const updated = { ...m, [field]: value };
        if (field === "name") {
          const parts = value.trim().split(" ");
          updated.initials =
            parts.length >= 2
              ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
              : value.substring(0, 2).toUpperCase();
        }
        return updated;
      })
    );
  };

  const removeMember = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Remove this board member?")) {
      setMembers(members.filter((m) => m.id !== id));
      if (editingId === id) setEditingId(null);
    }
  };

  const moveMember = (index: number, direction: -1 | 1, e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= members.length) return;
    const updated = [...members];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setMembers(updated);
  };

  const editing = members.find((m) => m.id === editingId);

  if (loading) return <div style={{ padding: 40, color: "#8B92A0" }}>Loading...</div>;

  return (
    <>
      <div className="topbar">
        <h1>Board Members</h1>
        <div className="topbar-actions">
          {saved && (
            <span style={{ fontSize: 13, color: "#38A169", fontWeight: 500 }}>
              Saved!
            </span>
          )}
          <button className="btn-save" onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div style={{ display: "flex", alignItems: "center" }}>
            <h3>Current Board</h3>
            <span className="count">{members.length}</span>
          </div>
        </div>

        <div className="member-list">
          {members.map((member, index) => (
            <div
              className="member-row"
              key={member.id}
              onClick={() => setEditingId(member.id)}
            >
              <div className="member-avatar">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} />
                ) : (
                  member.initials || "?"
                )}
              </div>
              <div className="member-details">
                <span className="member-role">{member.role || "No role set"}</span>
                <h4>{member.name || "Unnamed"}</h4>
                <p>{member.email || member.affiliation || "No details"}</p>
              </div>
              <div className="member-row-actions">
                <button
                  className="btn-icon-sm"
                  onClick={(e) => moveMember(index, -1, e)}
                  title="Move up"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </button>
                <button
                  className="btn-icon-sm"
                  onClick={(e) => moveMember(index, 1, e)}
                  title="Move down"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <button
                  className="btn-icon-sm danger"
                  onClick={(e) => removeMember(member.id, e)}
                  title="Remove"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="btn-add-row" onClick={addMember}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Board Member
        </div>
      </div>

      {/* Edit Modal */}
      <AdminModal
        title="Edit Board Member"
        subtitle={editing ? `Editing: ${editing.name || "New Member"}` : ""}
        open={!!editing}
        onClose={() => setEditingId(null)}
      >
        {editing && (
          <>
            <ImageUpload
              value={editing.photo}
              onChange={(url) => updateMember(editing.id, "photo", url)}
              folder="board"
              label="Photo"
              previewStyle="circle"
              recommendedSize="400x400px"
            />

            <div className="field-row" style={{ marginTop: 24 }}>
              <div className="field">
                <label>Full Name</label>
                <input
                  type="text"
                  value={editing.name}
                  onChange={(e) => updateMember(editing.id, "name", e.target.value)}
                  placeholder="Full name"
                />
              </div>
              <div className="field">
                <label>Role / Title</label>
                <select
                  value={editing.role}
                  onChange={(e) => updateMember(editing.id, "role", e.target.value)}
                >
                  <option value="">Select role</option>
                  <option>President</option>
                  <option>Vice President</option>
                  <option>Secretary</option>
                  <option>Treasurer</option>
                  <option>Director of Membership</option>
                  <option>Corporate Ambassador</option>
                  <option>Public Relations</option>
                  <option>Public Relations Co-Chair</option>
                  <option>Les Clefs d&apos;Or Liaison</option>
                </select>
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  value={editing.email}
                  onChange={(e) => updateMember(editing.id, "email", e.target.value)}
                  placeholder="email@thelaca.com"
                />
              </div>
              <div className="field">
                <label>Hotel / Affiliation</label>
                <input
                  type="text"
                  value={editing.affiliation}
                  onChange={(e) => updateMember(editing.id, "affiliation", e.target.value)}
                  placeholder="e.g. Peninsula Beverly Hills"
                />
              </div>
            </div>
          </>
        )}
      </AdminModal>
    </>
  );
}
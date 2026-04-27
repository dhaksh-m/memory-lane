"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  orderBy,
  query,
  onSnapshot
} from "firebase/firestore";

export default function AdminPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [images, setImages] = useState<{ id: string; src?: string; event?: string }[]>([]);
  const [messages, setMessages] = useState<{ id: string; text?: string; name?: string }[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Tabs
  const [activeTab, setActiveTab] = useState<"IMAGES" | "MESSAGES">("IMAGES");

  // Edit states for Image
  const [editingImageId, setEditingImageId] = useState("");
  const [editEventValue, setEditEventValue] = useState("");

  // States for Messages
  const [newMessageText, setNewMessageText] = useState("");
  const [newMessageName, setNewMessageName] = useState("");
  const [editingMessageId, setEditingMessageId] = useState("");
  const [editMessageText, setEditMessageText] = useState("");
  const [editMessageName, setEditMessageName] = useState("");

  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);

  const ADMIN_PASSWORD = "dhaksh123";

  const EVENTS = [
    "MEMORIES",
    "FRESHERS DAY",
    "FLASH MOB",
    "AUTO EXPO",
    "TRADITIONAL DAY",
    "DJ NIGHT",
    "TECH FEST",
    "OTHER EVENT",
  ];

  // 🔥 FETCH DATA FROM FIREBASE (Real-time)
  useEffect(() => {
    if (!authorized) return;

    // Listen to images
    const qImages = query(collection(db, "vault"), orderBy("createdAt", "desc"));
    const unsubImages = onSnapshot(qImages, (snapshot) => {
      setImages(snapshot.docs.map((doc) => {
        const d = doc.data();
        return { id: doc.id, src: d.src, event: d.event };
      }));
    });

    // Listen to messages
    const qMessages = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(qMessages, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => {
        const d = doc.data();
        return { id: doc.id, text: d.text, name: d.name };
      }));
    });

    return () => {
      unsubImages();
      unsubMessages();
    };
  }, [authorized]);

  // 🔥 IMAGE UPLOAD
  const handleUpload = async () => {
    if (!file || !selectedEvent) {
      alert("Select file + event");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "memory_lane_upload");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqcix6cn4/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.secure_url) {
        alert("Upload failed ❌");
        setLoading(false);
        return;
      }

      await addDoc(collection(db, "vault"), {
        src: data.secure_url,
        event: selectedEvent,
        createdAt: Date.now(),
      });

      alert("Uploaded successfully 🚀");

      setFile(null);
      setPreview("");
      setSelectedEvent("");
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Error ❌");
      setLoading(false);
    }
  };

  // 🔥 DELETE IMAGE
  const handleDeleteImage = async (id: string) => {
    if(!confirm("Are you sure you want to delete this image?")) return;
    await deleteDoc(doc(db, "vault", id));
  };

  // 🔥 EDIT IMAGE EVENT
  const handleEditImageEvent = async (id: string) => {
    if (!editEventValue) return;
    await updateDoc(doc(db, "vault", id), {
      event: editEventValue,
    });
    setEditingImageId("");
    setEditEventValue("");
  };

  // 🔥 ADD MESSAGE
  const handleAddMessage = async () => {
    if (!newMessageText) {
      alert("Message text is required");
      return;
    }
    await addDoc(collection(db, "messages"), {
      text: newMessageText,
      name: newMessageName || "Anonymous",
      createdAt: Date.now(),
    });
    setNewMessageText("");
    setNewMessageName("");
    alert("Message added 🚀");
  };

  // 🔥 DELETE MESSAGE
  const handleDeleteMessage = async (id: string) => {
    if(!confirm("Are you sure you want to delete this message?")) return;
    await deleteDoc(doc(db, "messages", id));
  };

  // 🔥 EDIT MESSAGE
  const handleEditMessage = async (id: string) => {
    if (!editMessageText) return;
    await updateDoc(doc(db, "messages", id), {
      text: editMessageText,
      name: editMessageName || "Anonymous",
    });
    setEditingMessageId("");
    setEditMessageText("");
    setEditMessageName("");
  };

  // 🔒 LOGIN
  if (!authorized) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        <div className="bg-white/10 p-8 rounded-xl text-center">
          <h1 className="text-xl mb-4 text-yellow-400">Admin Login</h1>
          <input
            type="password"
            placeholder="Password"
            className="p-2 w-full mb-4 text-black rounded"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => { if(e.key === 'Enter') setAuthorized(password === ADMIN_PASSWORD) }}
          />
          <button
            onClick={() => setAuthorized(password === ADMIN_PASSWORD)}
            className="bg-yellow-500 px-4 py-2 rounded text-black font-semibold w-full hover:bg-yellow-400"
          >
            Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white p-10 pb-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl text-center text-yellow-400 mb-8 font-bold">
          Admin Panel ⚡
        </h1>

        {/* TABS */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("IMAGES")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === "IMAGES" ? "bg-yellow-500 text-black" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Manage Images
          </button>
          <button
            onClick={() => setActiveTab("MESSAGES")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === "MESSAGES" ? "bg-yellow-500 text-black" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Manage Wall
          </button>
        </div>

        {activeTab === "IMAGES" && (
          <>
            {/* UPLOAD BOX */}
            <div className="bg-white/5 p-6 rounded-xl mb-10 border border-white/10 shadow-lg max-w-2xl mx-auto">
              <h2 className="text-xl mb-4 font-semibold text-yellow-400">Upload New Media</h2>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="w-full p-3 text-black mb-4 rounded"
              >
                <option value="">Select Event / Category</option>
                {EVENTS.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>

              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  setFile(f || null);
                  if (f) setPreview(URL.createObjectURL(f));
                }}
                className="mb-4 w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-400"
              />

              {/* PREVIEW */}
              {preview && (
                <div className="mb-4 bg-black/50 p-2 rounded-lg inline-block">
                  <img
                    src={preview}
                    className="rounded-lg max-h-40 object-cover"
                    alt="preview"
                  />
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={loading}
                className="bg-yellow-500 w-full py-3 rounded text-black font-semibold hover:bg-yellow-400 transition disabled:opacity-50"
              >
                {loading ? "Uploading..." : "Upload 🚀"}
              </button>
            </div>

            {/* IMAGE LIST */}
            <div>
              <h2 className="text-xl mb-4 font-semibold text-yellow-400">Uploaded Media ({images.length})</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.map((img) => (
                  <div key={img.id} className="relative bg-white/5 rounded-xl p-2 border border-white/10 flex flex-col justify-between">
                    <img src={img.src} className="rounded-lg w-full h-32 object-cover mb-2 bg-black/50" />

                    <div className="mt-auto">
                      {editingImageId === img.id ? (
                        <div className="flex flex-col gap-2">
                          <select
                            value={editEventValue}
                            onChange={(e) => setEditEventValue(e.target.value)}
                            className="w-full p-1 text-black text-xs rounded"
                          >
                            <option value="">Select Event</option>
                            {EVENTS.map((e) => (
                              <option key={e} value={e}>{e}</option>
                            ))}
                          </select>
                          <div className="flex gap-2">
                            <button onClick={() => handleEditImageEvent(img.id)} className="bg-green-500 text-white px-2 py-1 text-xs rounded flex-1">Save</button>
                            <button onClick={() => setEditingImageId("")} className="bg-gray-500 text-white px-2 py-1 text-xs rounded flex-1">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-xs text-center font-semibold text-yellow-400 mb-2 truncate">{img.event}</p>
                          <div className="flex justify-between gap-2">
                            <button
                              onClick={() => {
                                setEditingImageId(img.id);
                                setEditEventValue(img.event || "");
                              }}
                              className="bg-blue-500 hover:bg-blue-400 px-2 py-1 text-xs rounded flex-1 transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteImage(img.id)}
                              className="bg-red-500 hover:bg-red-400 px-2 py-1 text-xs rounded flex-1 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "MESSAGES" && (
          <>
            {/* ADD MESSAGE BOX */}
            <div className="bg-white/5 p-6 rounded-xl mb-10 border border-white/10 shadow-lg max-w-2xl mx-auto">
               <h2 className="text-xl mb-4 font-semibold text-yellow-400">Add New Message</h2>
               <textarea
                 placeholder="Message Text"
                 value={newMessageText}
                 onChange={(e) => setNewMessageText(e.target.value)}
                 className="w-full p-3 text-black mb-4 rounded h-24 resize-none"
               />
               <input
                 type="text"
                 placeholder="Author Name (optional)"
                 value={newMessageName}
                 onChange={(e) => setNewMessageName(e.target.value)}
                 className="w-full p-3 text-black mb-4 rounded"
               />
               <button
                 onClick={handleAddMessage}
                 className="bg-yellow-500 w-full py-3 rounded text-black font-semibold hover:bg-yellow-400 transition"
               >
                 Add Message 📝
               </button>
            </div>

            {/* MESSAGES LIST */}
            <div>
              <h2 className="text-xl mb-4 font-semibold text-yellow-400">Wall Messages ({messages.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-white/10 p-4 rounded-xl border border-white/20 relative">
                    {editingMessageId === msg.id ? (
                      <div className="flex flex-col gap-2">
                        <textarea
                          value={editMessageText}
                          onChange={(e) => setEditMessageText(e.target.value)}
                          className="w-full p-2 text-black text-sm rounded h-20 resize-none"
                        />
                        <input
                          type="text"
                          value={editMessageName}
                          onChange={(e) => setEditMessageName(e.target.value)}
                          className="w-full p-2 text-black text-sm rounded"
                          placeholder="Name"
                        />
                        <div className="flex gap-2 mt-2">
                          <button onClick={() => handleEditMessage(msg.id)} className="bg-green-500 text-white px-3 py-1 text-sm rounded flex-1">Save</button>
                          <button onClick={() => setEditingMessageId("")} className="bg-gray-500 text-white px-3 py-1 text-sm rounded flex-1">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm italic mb-3 whitespace-pre-wrap">"{msg.text}"</p>
                        <p className="text-xs font-semibold text-yellow-400">- {msg.name || "Anonymous"}</p>
                        
                        <div className="absolute top-2 right-2 flex gap-2">
                          <button
                            onClick={() => {
                              setEditingMessageId(msg.id);
                              setEditMessageText(msg.text || "");
                              setEditMessageName(msg.name || "");
                            }}
                            className="bg-blue-500 hover:bg-blue-400 p-1 text-[10px] rounded transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="bg-red-500 hover:bg-red-400 p-1 text-[10px] rounded transition"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
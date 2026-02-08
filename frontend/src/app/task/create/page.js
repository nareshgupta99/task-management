import React from "react";

const CreateTask = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      
      {/* Modal */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-6 text-white">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Create New Task</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Task Title */}
        <div className="mb-4">
          <label className="text-sm text-slate-300">
            What needs to be done?
          </label>
          <input
            type="text"
            placeholder="e.g., Buy groceries for the week"
            className="mt-1 w-full px-4 py-2.5 rounded-lg bg-black border border-slate-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="text-sm text-slate-300">
            Add more details (optional)
          </label>
          <textarea
            rows="3"
            placeholder="Describe the steps or additional context..."
            className="mt-1 w-full px-4 py-2.5 rounded-lg bg-black border border-slate-700 resize-none focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Date & Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          
          {/* Due Date */}
          <div>
            <label className="text-sm text-slate-300">Due Date</label>
            <input
              type="date"
              className="mt-1 w-full px-4 py-2.5 rounded-lg bg-black border border-slate-700 text-slate-300 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="text-sm text-slate-300">Priority</label>
            <div className="mt-1 flex rounded-lg overflow-hidden border border-slate-700">
              <button className="flex-1 py-2 text-sm hover:bg-slate-800">
                Low
              </button>
              <button className="flex-1 py-2 text-sm bg-blue-600">
                Med
              </button>
              <button className="flex-1 py-2 text-sm hover:bg-slate-800">
                High
              </button>
            </div>
          </div>

        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-300 hover:text-white transition"
          >
            Cancel
          </button>
          <button className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition">
            + Create Task
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateTask;

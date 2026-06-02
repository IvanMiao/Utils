import { Save, Trash2, X } from "lucide-react";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import { Button, Field, Input, Select, Textarea } from "../design-system";
import { PRIORITY_META, PRIORITY_ORDER, STATUS_META, STATUS_ORDER } from "../lib/data";
import type { KanbanStatus, Poc, Priority, Task, TaskFormState } from "../lib/types";

export function TaskDrawer({
  task,
  taskForm,
  setTaskForm,
  pocs,
  onClose,
  onSubmit,
  onDelete,
}: {
  task?: Task | null;
  taskForm: TaskFormState;
  setTaskForm: Dispatch<SetStateAction<TaskFormState>>;
  pocs: Poc[];
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onDelete?: () => void;
}): JSX.Element {
  function update<K extends keyof TaskFormState>(key: K, value: TaskFormState[K]): void {
    setTaskForm({ ...taskForm, [key]: value });
  }

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        aria-label="Close task editor"
        onClick={onClose}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col border-l border-border bg-card shadow-xl transition-transform duration-300">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">{task ? "Edit task" : "New task"}</p>
            <h2 className="mt-1 text-lg font-semibold">{task?.title || "Task details"}</h2>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form className="flex min-h-0 flex-1 flex-col" onSubmit={onSubmit}>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5 scrollbar-soft">
            <Field label="Title">
              <Input value={taskForm.title} onChange={(event) => update("title", event.target.value)} required />
            </Field>

            <Field label="Description">
              <Textarea
                value={taskForm.description}
                onChange={(event) => update("description", event.target.value)}
                rows={4}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="POC">
                <Select value={taskForm.pocId} onChange={(event) => update("pocId", event.target.value)}>
                  {pocs.map((poc) => (
                    <option key={poc.id} value={poc.id}>
                      {poc.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Status">
                <Select
                  value={taskForm.status}
                  onChange={(event) => update("status", event.target.value as KanbanStatus)}
                >
                  {STATUS_ORDER.map((status) => (
                    <option key={status} value={status}>
                      {STATUS_META[status].label}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Priority">
                <Select
                  value={taskForm.priority}
                  onChange={(event) => update("priority", event.target.value as Priority)}
                >
                  {PRIORITY_ORDER.map((priority) => (
                    <option key={priority} value={priority}>
                      {PRIORITY_META[priority].label}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Due date">
                <Input
                  type="date"
                  value={taskForm.dueDate}
                  onChange={(event) => update("dueDate", event.target.value)}
                  required
                />
              </Field>
            </div>

            <Field label="Tags">
              <Input
                value={taskForm.tags}
                onChange={(event) => update("tags", event.target.value)}
                placeholder="risk, eval, design"
              />
            </Field>

            <Field label="Links">
              <Input value={taskForm.links} onChange={(event) => update("links", event.target.value)} placeholder="https://..." />
            </Field>

            <Field label="Notes">
              <Textarea value={taskForm.notes} onChange={(event) => update("notes", event.target.value)} rows={5} />
            </Field>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-4">
            {onDelete ? (
              <Button type="button" variant="destructive" onClick={onDelete}>
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            ) : (
              <span />
            )}
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
        </form>
      </aside>
    </div>
  );
}

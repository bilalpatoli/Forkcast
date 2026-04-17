type MoodSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

const moods = ["cozy", "quick", "date night", "group dinner", "comfort food"];

export function MoodSelect({ value, onChange }: MoodSelectProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="rounded-md border border-neutral-300 px-3 py-2"
    >
      <option value="">Any mood</option>
      {moods.map((mood) => (
        <option key={mood} value={mood}>
          {mood}
        </option>
      ))}
    </select>
  );
}


import { BASE_STAT_LIMITS } from "@/domain/pokemon";

interface BSTModalProps {
  pokemonName: string;
  bst: number;
  maxBST: number;
  bstIsValid: boolean;
}

export function BSTModal({
  pokemonName,
  bst,
  maxBST,
  bstIsValid,
}: BSTModalProps) {
  return (
    <div className="mb-6 rounded-lg border border-slate-700 bg-slate-800 p-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-slate-400">BST</span>
          <p className="text-xs text-slate-500">{pokemonName}</p>
        </div>

        <span
          className={`text-2xl font-bold ${
            bstIsValid ? "text-white" : "text-red-400"
          }`}
        >
          {bst} / {maxBST}
        </span>
      </div>

      {!bstIsValid && (
        <p className="mt-3 text-sm text-red-400">
          ⚠ Las estadísticas superan el BST permitido para {pokemonName}.
        </p>
      )}

      <p className="mt-2 text-xs text-slate-500">
        Cada stat: {BASE_STAT_LIMITS.min}–{BASE_STAT_LIMITS.max}
      </p>
    </div>
  );
}

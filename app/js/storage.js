/**
 * ============================================================================
 * MOTOR DE PERSISTENCIA LOCAL OFFLINE-FIRST
 * storage.js · Almacenamiento seguro, importación/exportación JSON y cero pérdidas
 * ============================================================================
 * Garantiza que la familia pueda consultar y editar todos sus planes, fichas y
 * cálculos incluso en un apagón total sin conexión a internet.
 */

const STORAGE_PREFIX = "supervivencia_final_";

export const StorageEngine = {
    /**
     * Guarda un valor en localStorage con prefijo
     */
    set(key, value) {
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(STORAGE_PREFIX + key, serialized);
            return true;
        } catch (e) {
            console.error("Error al guardar en StorageEngine:", e);
            return false;
        }
    },

    /**
     * Obtiene un valor de localStorage
     */
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(STORAGE_PREFIX + key);
            if (item === null) return defaultValue;
            return JSON.parse(item);
        } catch (e) {
            console.error("Error al leer de StorageEngine:", e);
            return defaultValue;
        }
    },

    /**
     * Elimina una clave específica
     */
    remove(key) {
        try {
            localStorage.removeItem(STORAGE_PREFIX + key);
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
     * Exporta todos los datos guardados de la familia a un archivo JSON descargable
     */
    exportAllData() {
        const dump = {};
        for (let i = 0; i < localStorage.length; i++) {
            const rawKey = localStorage.key(i);
            if (rawKey.startsWith(STORAGE_PREFIX)) {
                const cleanKey = rawKey.replace(STORAGE_PREFIX, "");
                dump[cleanKey] = this.get(cleanKey);
            }
        }
        
        const blob = new Blob([JSON.stringify(dump, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `plan_familiar_backup_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    /**
     * Importa datos desde un archivo JSON
     */
    importData(jsonString) {
        try {
            const parsed = JSON.parse(jsonString);
            Object.keys(parsed).forEach(k => {
                this.set(k, parsed[k]);
            });
            return { success: true, count: Object.keys(parsed).length };
        } catch (e) {
            return { success: false, error: e.message };
        }
    }
};

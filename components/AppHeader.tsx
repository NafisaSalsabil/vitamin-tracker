import { router, usePathname } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

const COLORS = {
  forest: "#16302A",
  forestDeep: "#0F211C",
  gold: "#E8A33D",
  textPrimary: "#FBF7F0",
  textMuted: "rgba(251, 247, 240, 0.65)",
  cardBorder: "rgba(251, 247, 240, 0.15)",
};

const MENU_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Check-in", path: "/checkin" },
  { label: "Profile", path: "/profile" },
];

export default function AppHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleNavigate = (path: string) => {
    setOpen(false);
    router.push(path as any);
  };

  return (
    <View style={styles.header}>
      <Text style={styles.wordmark}>MYVITALS</Text>

      <Pressable
        style={styles.menuButton}
        onPress={() => setOpen(true)}
        hitSlop={10}
      >
        <View style={styles.bar} />
        <View style={styles.bar} />
        <View style={styles.bar} />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.menuCard}>
            {MENU_ITEMS.map((item, i) => {
              const isActive = pathname === item.path;
              return (
                <Pressable
                  key={item.path}
                  style={[
                    styles.menuItem,
                    i === MENU_ITEMS.length - 1 && styles.menuItemLast,
                  ]}
                  onPress={() => handleNavigate(item.path)}
                >
                  <Text
                    style={[
                      styles.menuItemText,
                      isActive && styles.menuItemTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {isActive && <View style={styles.activeDot} />}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.forest,
    paddingTop: 54,
    paddingBottom: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  wordmark: {
    fontFamily: "SpaceMono",
    fontSize: 13,
    letterSpacing: 2,
    color: COLORS.gold,
  },
  menuButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 5,
  },
  bar: {
    width: 22,
    height: 2,
    borderRadius: 1,
    backgroundColor: COLORS.textPrimary,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 33, 28, 0.6)",
    alignItems: "flex-end",
  },
  menuCard: {
    marginTop: 90,
    marginRight: 16,
    backgroundColor: COLORS.forestDeep,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    minWidth: 180,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemText: {
    fontSize: 15,
    color: COLORS.textMuted,
  },
  menuItemTextActive: {
    color: COLORS.textPrimary,
    fontWeight: "600",
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.gold,
  },
});

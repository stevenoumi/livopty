import { Lock } from "~/lib/icons/Lock";
import { MessageCircle } from "~/lib/icons/MessageCircle";
import { MessageSquareDot } from "~/lib/icons/MessageSquareDot";
import { Database } from "~/lib/icons/Database";
import { Users } from "~/lib/icons/Users";
import { CircleHelp } from "~/lib/icons/CircleHelp";
import { LogOut } from "~/lib/icons/LogOut";
import { Info } from "~/lib/icons/Info";
import { KeyRound } from "~/lib/icons/KeyRound";

const GeneralsettingsItems = [
  { Icon: KeyRound, title: "Compte", link: "/profile" },
  { Icon: Lock, title: "Confidentialité", link: "/account" },
  { Icon: MessageCircle, title: "Discussions", link: "/devices" },
  { Icon: MessageSquareDot, title: "Notifications", link: "/notifications" },
  { Icon: Database, title: "Stockage et données", link: "/themes" },
];

const InfomationSettingsItems = [
  { Icon: CircleHelp, title: "Aide", link: "/help" },
  { Icon: Info, title: "À propos de nous", link: "/about" },
  { Icon: Users, title: "inviter des amis", link: "/privacy" },
  { Icon: LogOut, title: "Déconnexion", link: "/logout" },
];
export { GeneralsettingsItems, InfomationSettingsItems };

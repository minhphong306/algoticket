"use client";
import { Profile } from "@/types";
import { copyToClipboard } from "@/utils/clipboard";
import { useWallet } from "@txnlab/use-wallet";
import Image from "next/image";
import Link from "next/link";

export default function ProfileComponent(profile: Profile) {
  const { activeAccount } = useWallet();

  const formatAddress = (address: string) => {
    if (!address) {
      return "";
    }

    return `${activeAccount?.address.slice(0, 15)}...`;
  };
  return (
    <div className="author-profile flex">
      <div className="feature-profile">
        <Image
          src={profile.avatar_url}
          width={400}
          height={400}
          alt={profile.name}
          className="avatar"
        />
      </div>
      <div className="infor-profile">
        <span>Author Profile</span>
        <h2 className="title">{profile.name}</h2>
        <p className="content">{profile.bio}</p>
        <form>
          <input
            type="text"
            className="inputcopy"
            defaultValue={formatAddress(activeAccount?.address ?? "")}
            readOnly
          />
          <button
            type="button"
            className="btn-copycode"
            onClick={() => copyToClipboard(activeAccount?.address ?? "")}
          >
            <i className="icon-fl-file-1"></i>
          </button>
        </form>
      </div>
      <div className="widget-social style-3">
        <ul>
          <li>
            <Link href={profile.socials?.twitter || "#"}>
              <i className="fab fa-twitter"></i>
            </Link>
          </li>
          <li>
            <Link href={profile.socials?.facebook || "#"}>
              <i className="fab fa-facebook"></i>
            </Link>
          </li>
          <li>
            <Link href={profile.socials?.instagram || "#"}>
              <i className="fab fa-instagram"></i>
            </Link>
          </li>
          <li>
            <Link href={profile.socials?.linkedin || "#"}>
              <i className="fab fa-linkedin"></i>
            </Link>
          </li>
        </ul>
        {/* <div className="btn-profile">
          <Link href="/login" className="sc-button style-1 follow">
            Follow
          </Link>
        </div> */}
      </div>
    </div>
  );
}
